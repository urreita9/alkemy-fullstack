<p align='left'>
    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV6PhkFAIQspPH6lKCTjfYEPgTeLE1R_eaOjV-VZzLGAir7s4ic-RPFH9PPeeUqo3887k&usqp=CAU' </img>
</p>

# Challenge Fullstack - Alkemy

## Objetivo
Desarrollar una aplicación para administración de presupuesto personal. La misma debe
permitir: 
- crear / editar ingresos y egresos de dinero, 
- mostrar un balance resultante de las
operaciones registradas.



API desarrollada en node y express.
Datos persistidos en postgreSQL. Sequelize ORM.
Cliente desarrollado en React JS y redux como state managment. 



La aplicación cuenta con autenticación de usuarios y verificación JWT.  

## Home
<p align="left">
  <img height="150"  src="./tablet_home.png" />
</p>
Esta pantalla muesta las ultimas 10 operaciones cargadas por el usuario, junto con el balance TOTAL (incluyendo las demas operaciones, llegado el caso en que sean mas de 10) y un gráfico que muestra las porciones de ingresos y egresos totales de dinero.

## Apartado de Operaciones
<p align="left">
  <img height="150"  src="./tablet_ops.png" />
</p>
Esta pantalla muesta la totalidad de las operaciones. Podemos agregar nuevas, editar y actualizar en la DB las que ya están cargadas, así como eliminarlas. No se puede editar el tipo de operación, ingreso o egreso (tal como pide la consigna).

## Registro y Login 
<p align="left">
  <img height="150"  src="./mobile_register.png" />
</p>
El visitante que desee utilizar Alkemy Wallet deberá registrarse mediante Email y Password. El backend le devolvera un JWT que será utilizado para verificar la identidad del usuario en cada petición.

## Diseño responsive con Next UI. 
<p align="left">
  <img height="150"  src="./tablet_delete.png" />
</p>

Deploy: Heroku y Vercel.

Para correrlo localmente:
- clonar el repositorio
- instalar las dependencias (npm install). 
- Desde la carpeta api/, ejecutar npm start para iniciar el servidor. 
- Desde la carpeta client/, ejecutar npm start para darle inicio al browser. 



