USUARIO SIN LOGEAR:

   navbar (elemento fijo) => acceso a: Register, login, getWorkers, getTattoos
1. Home (div deshabilitado de welcome, se habilita cuando te logeas)
    - imagen principal
    - footer
    - titulo
    - logo

2. Register
    - imagen decorativa
    - inputs (full_name, email, password, phone_number, image)
    - boton create/ sign up/ register user (cuando se cree, mensaje: usuario creado con exito)
    !! BACKEND: añadir foto a user

3. Login
    - imagen decorativa
    - email
    - password
    - boton log in

4. GetWorkers (estudiar el contenido)
    - cards con la info de los trabajadores (full_name, foto, email) 
    !! BACKEND: añadir foto a user => afecta a create user y update user

5. GetTattoos (toggle [para expandir una card al hacer click])
    - cards con la info del tatu/piercing (name, category, price, image)
    - (toggle [para expandir una card al hacer click])
    !! BACKEND: realizar el endpoint getPortfolio

6. Error (EXTRA)
    - especificamente error 404 NOT FOUND, se mostrara cuando falle la conexion con el backend
    - apagar el servidor de backend para mostrarlo en clase.
    - vista de fondo neutro que muestra el error.     

------------------------------------------------------------------------

USUARIO LOGEADO:

    navbar (elemento fijo) => acceso a: getWorkers, getTattoos, profile, appointments, logout [boton que te lleva a Home y borra el token]
7. Profile
    - info user
    - boton para actualizar la info del user (update user profile)
    !! BACKEND: añadir foto a user
8. Update user profile 
    - inputs (full_name, password, phone_number, image)
9. Appointments, secciones:
    - botón para acceder a create appointment
    - cards que muestran los appointments (toggle [para expandir una card al hacer click])
    - Las propias cards tienen 2 botones, 1 de delete y 1 de update (te lleva a la vista update appointment)
10. Create appointment
    - inputs (date, shift, email, portfolio_id)
11. Update appointment
    - inputs (id, date, shift, email, name)

SUPER ADMIN:

Cuando se logea el super admin:
    navbar (elemento fijo) => acceso a: getWorkers, getTattoos, profile, appointments, create worker, logout [boton que te lleva a Home y borra el token]
12. create worker
    - inputs (full_name, email, password, phone_number, image)

20. Busqueda (DELUXE)