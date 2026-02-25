de todo lo que dijiste, lo único que me interesa es esto: Ver nombre del usuario en
lista (solo muestra userId numérico) ❌ Historial de accesos (quién entró y a
qué hora) ✅ Intentos fallidos (huellas no reconocidas) ❌ Alertas de acceso
denegado (usuario vencido intentando entrar) ❌ Capacidad del lector Digital Persona
(La asignación de slots debería ser automática. el dueño ni siquiera se entera).
❌ Eliminación masiva (ej: borrar todas las huellas vencidas): esto es correcto,
pero deben de borrarse del slot y no de la db. dtw, al enrollar un nuevo usuario
su huella debe de guardarse en la db. cuando el usuario regrese, debe de
cargarse en automático de nuevo a un slot. ❌ Re-enrollment (actualizar huella
degradada) ❌ Validar membresía activa antes de permitir acceso
