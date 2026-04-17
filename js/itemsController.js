//Crear 10 objetos en JavaScript y almacenarlos en local  
                             
const productos = [
{
nombre: "---",
precio: 00,
categoria: "---",
stock: 10,
descripcion: "----",
imagen: "-----"
},

{
nombre: "---",
precio: 00,
categoria: "---",
stock: 10,
descripcion: "----",
imagen: "-----"
},

{
nombre: "---",
precio: 00,
categoria: "---",
stock: 0,
descripcion: "----",
imagen: "-----"
},

{
nombre: "---",
precio: 00,
categoria: "---",
stock: 0,
descripcion: "----",
imagen: "-----"
},

{
nombre: "---",
precio: 00,
categoria: "---",
stock: 00,
descripcion: "----",
imagen: "-----"
},

{
nombre: "---",
precio: 00,
categoria: "---",
stock: 00,
descripcion: "----",
imagen: "-----"
},

{
nombre: "---",
precio: 00,
categoria: "---",
stock: 00,
descripcion: "----",
imagen: "-----"
},

];

localStorage.setItem("productos", JSON.stringify(productos));