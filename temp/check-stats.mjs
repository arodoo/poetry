const pw = 'ChangeMe123' + String.fromCharCode(33)
const login = await fetch('http://localhost:8080/api/v1/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'admin', password: pw }),
})
const loginText = await login.text()
console.log('Login status:', login.status)
console.log('Login body (first 300):', loginText.substring(0, 300))

if (login.status === 200) {
  const { accessToken } = JSON.parse(loginText)
  const h = { Authorization: `Bearer ${accessToken}` }
  
  const stats = await fetch(
    'http://localhost:8080/api/v1/statistics/memberships',
    { headers: h }
  )
  console.log('Stats status:', stats.status)
  console.log('Stats:', await stats.text())
  
  const mems = await fetch(
    'http://localhost:8080/api/v1/user-memberships?page=0&size=5',
    { headers: h }
  )
  console.log('Mems status:', mems.status)
  console.log('Mems:', (await mems.text()).substring(0, 300))
}
