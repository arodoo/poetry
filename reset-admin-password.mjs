// Script para restaurar la contraseña del admin a 'ChangeMe123!'
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Leer la contraseña desde archivo temporal o usar default
const tempFile = `${__dirname}/.admin-temp-password.txt`
let newPassword = 'ChangeMe123!'

try {
  if (readFileSync(tempFile, 'utf8')) {
    console.log('Contraseña temporal encontrada, intentando restaurar...')
  }
} catch (e) {}

const API_BASE = 'http://localhost:8080'
let accessToken = null

async function getAccessToken() {
  try {
    const response = await fetch(`${API_BASE}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'admin',
        password: newPassword,
      }),
    })

    if (response.ok) {
      const data = await response.json()
      accessToken = data.accessToken
      console.log('✓ Login exitoso con nueva contraseña')
      return true
    }
    return false
  } catch (error) {
    console.error('Error en login:', error.message)
    return false
  }
}

async function updateAdminPassword() {
  try {
    // Primero buscar el ID del usuario admin
    const usersResponse = await fetch(`${API_BASE}/api/v1/users`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    if (!usersResponse.ok) {
      console.error('Error obteniendo usuarios:', usersResponse.status)
      return false
    }

    const users = await usersResponse.json()
    const adminUser = users.find((u) => u.username === 'admin')

    if (!adminUser) {
      console.error('Usuario admin no encontrado')
      return false
    }

    console.log(`Encontrado admin con ID: ${adminUser.id}`)

    // Actualizar contraseña
    const updateResponse = await fetch(
      `${API_BASE}/api/v1/users/${adminUser.id}/password`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: 'ChangeMe123!',
        }),
      }
    )

    if (updateResponse.status === 204) {
      console.log('✓ Contraseña del admin restaurada a "ChangeMe123!"')
      return true
    } else {
      console.error('Error actualizando contraseña:', updateResponse.status)
      return false
    }
  } catch (error) {
    console.error('Error en actualización:', error.message)
    return false
  }
}

async function main() {
  console.log('Iniciando restauración de contraseña del admin...')

  // Si no podemos logear con la nueva contraseña, necesitamos usar una temporal
  let loginSuccess = await getAccessToken()

  if (!loginSuccess) {
    console.log('Login falló, intentando métodos alternativos...')

    // Intentar con otras contraseñas comunes
    const commonPasswords = [
      'Admin123!',
      'admin123!',
      'Password123!',
      'password123!',
      'NewTestPass123!',
      'TestNewPass123!',
      'ChangeMe123',
      'changeMe123!',
    ]

    for (const password of commonPasswords) {
      console.log(`Probando contraseña: ${password}`)
      const response = await fetch(`${API_BASE}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'admin',
          password: password,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        accessToken = data.accessToken
        newPassword = password
        console.log(`✓ Login exitoso con contraseña temporal: ${password}`)
        loginSuccess = true
        break
      }
    }
  }

  if (!loginSuccess) {
    console.error('✗ No se pudo obtener acceso. Verifica que:')
    console.error('  1. El backend esté corriendo en http://localhost:8080')
    console.error('  2. El usuario admin exista')
    console.error('  3. Intenta con la última contraseña conocida manualmente')
    process.exit(1)
  }

  // Actualizar contraseña
  const success = await updateAdminPassword()

  if (success) {
    console.log('✓ Restauración completada con éxito')
    console.log('Puedes ahora usar "admin:ChangeMe123!" para login')
  } else {
    console.error('✗ No se pudo restaurar la contraseña')
  }
}

main().catch((error) => {
  console.error('Error en ejecución:', error)
  process.exit(1)
})
