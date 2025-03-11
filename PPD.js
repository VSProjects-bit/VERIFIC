    document.addEventListener("DOMContentLoaded", function () {
        const telefono = localStorage.getItem("telefono");
        if (!telefono) {
            console.log("No se ha definido un teléfono para el usuario.");
            return;
        }
        const saldoDisponible = parseFloat(localStorage.getItem("saldo_" + telefono)) || 0;
 
        let contadorTareas = parseInt(localStorage.getItem("contadorTareas_" + telefono) || "0");
    
        const btnOrden = document.getElementById("btnOrden");
        const mensajePedidoPendiente = document.getElementById("mensajePedidoPendiente");
        const overlay = document.getElementById("overlay");
        const loadingImage = document.getElementById("loadingImage");
        const loadingText = document.getElementById("loadingText");
    
        const listaPedidosVIP1 = [
        { nombre: "Cargador Anker PowerPort III Nano", imagen: "https://tse4.mm.bing.net/th?id=OIP.8DK8FMROK-uAgfDUxButDAHaHa&w=200&h=200&c=7", saldoRequerido: 96, ganancias: 9  },
                        { nombre: "Licuadora de vaso Ninja", imagen: "https://tse3.mm.bing.net/th?id=OIP.iWOZb8ID5zepkaREhWaw-AAAAA&w=200&h=405&c=7" , saldoRequerido: 100, ganancias: 10  },
                        { nombre: "Horno tostador Oster", imagen: "https://tse4.mm.bing.net/th?id=OIP.bUjYFaZvLqgEqnUZCQDgGwHaHa&w=200&h=200&c=7", saldoRequerido: 105, ganancias: 8  },
                        { nombre: "JBL Go 4 Bocina Portátil Bluetooth, 4.2W de Potencia", imagen: "https://m.media-amazon.com/images/I/71kzInVwzgL._AC_UL320_.jpg", saldoRequerido: 115, ganancias: 2  },
                        { nombre: "Xiaomi Bocina Portatil Sound Pocket 5W", imagen: "https://m.media-amazon.com/images/I/61pDY2MSxXL.__AC_SX300_SY300_QL70_ML2_.jpg", saldoRequerido: 124, ganancias: 8  },
                        { nombre: "Kingston USB DataTraveler Exodia Onyx Capacidad: 64GB USB-A 3.2 Gen 1 (DTXON/64GB)", imagen: "https://m.media-amazon.com/images/I/71fcmTRaCyL.__AC_SY300_SX300_QL70_ML2_.jpg", saldoRequerido: 129, ganancias: 6  },
                        { nombre: "Tarjeta de memoria microSDXC con adaptador de tamaño completo", imagen: "https://m.media-amazon.com/images/I/61DwejyTGkL.__AC_SX300_SY300_QL70_ML2_.jpg", saldoRequerido: 135, ganancias: 10  },
                        { nombre: "Audífonos Inalámbricos Btootos A90 Pro", imagen: "https://tse2.mm.bing.net/th?id=OIP.bWkL_sP3za8M1KidLDSURwHaHa&w=200&h=200&c=7", saldoRequerido: 260, ganancias: 17  },
                        { nombre: "Razer Orochi V2 - Ratón Inalámbrico para Juegos", imagen: "https://tse4.mm.bing.net/th?id=OIP.zlDTgCH_O6bIwAcS_ArE4gHaHa&w=200&h=200&c=7", saldoRequerido: 150, ganancias: 8  },
                        { nombre: "RUBOQE Cargador para Samsung 45W Tipo C", imagen: "https://m.media-amazon.com/images/I/51DZ6gjE9IL._AC_SY450_.jpg", saldoRequerido: 159, ganancias: 5  },
                        { nombre: "Control Inalámbrico Xbox Carbon Black", imagen: "https://tse2.mm.bing.net/th?id=OIP.A0EG1_OWONIhE5HdBvA8MgHaJx&pid=Api", saldoRequerido: 170, ganancias: 10 },
                        { nombre: "Funda para iPhone 16 6.1 Pulgadas, Carcasa Anti-Amarillo Antigolpes", imagen: "https://m.media-amazon.com/images/I/61Pa-fgtOEL.__AC_SX300_SY300_QL70_ML2_.jpg", saldoRequerido: 340, ganancias: 12  }
                        ];
    
        const listaPedidosVIP2 = [
        { nombre: "Televisión inteligente Amazon Fire TV Serie 4 de 55” en 4K UHD", imagen: "https://m.media-amazon.com/images/I/71dkOTwCDpL._AC_SX425_.jpg", saldoRequerido: 380, ganancias: 11  },
                { nombre: "Laptop MacBook Air Chip M2 (2023): Pantalla Liquid Retina de 15.3 Pulgadas,8GB", imagen: "https://m.media-amazon.com/images/I/81xW62KXNhL._AC_SX466_.jpg", saldoRequerido: 385, ganancias: 10  },
                { nombre: "CHUWI Tableta Android 14, Tableta Hi10 XPro de 10.1 Pulgadas,8GB RAM", imagen: "https://m.media-amazon.com/images/I/71bb2wy-GYL.__AC_SX300_SY300_QL70_ML2_.jpg", saldoRequerido: 390, ganancias: 13  },
                { nombre: "Nintendo Switch Lite - Turquoise", imagen: "https://m.media-amazon.com/images/I/61owpat34dL._AC_SX679_.jpg", saldoRequerido: 395, ganancias: 11  },
                { nombre: "iPhone 16e 128 GB", imagen: "https://m.media-amazon.com/images/I/41ueJLgQhdL._AC_SX466_.jpg", saldoRequerido: 400, ganancias: 10  },
                { nombre: "Lenovo ThinkCentre M820z Todo en uno Computadora de 21.5 Pulgadas FHD AIO", imagen: "https://m.media-amazon.com/images/I/61+qQOi29hL._AC_SY450_.jpg", saldoRequerido: 405, ganancias: 13  },
                { nombre: "Reproductor remoto PlayStation Portal - Midnight Black", imagen: "https://m.media-amazon.com/images/I/61tsnzYE7qL._AC_SX679_.jpg", saldoRequerido: 550, ganancias: 18  },
                { nombre: "Canon Cámara Mirrorless R100 RF-S 18-45mm F4.5-6.3 IS STM", imagen: "https://m.media-amazon.com/images/I/71edZl9AfcL._AC_SX450_.jpg", saldoRequerido: 415, ganancias: 13  },
                { nombre: "SAMSUNG Galaxy Watch Ultra 47mm Titanium, AI", imagen: "https://m.media-amazon.com/images/I/61G9bBIBB7L._AC_SY450_.jpg", saldoRequerido: 420, ganancias: 11  },
                { nombre: "Xbox Consola Series S digital de 512 GB - Robot White", imagen: "https://m.media-amazon.com/images/I/61wgsQ6bGtL._AC_SX679_.jpg", saldoRequerido: 425, ganancias: 13  },
                { nombre: "Apple iPhone 15 (128 GB)", imagen: "https://m.media-amazon.com/images/I/416MG51rNgL._AC_SY450_.jpg", saldoRequerido: 50, ganancias: 10  },
                { nombre: "Caixun Pantalla 50 Ultra HD 4K con Sistema operativo Web OS, Magic Remote Mod. CMX50VAUW", imagen: "https://m.media-amazon.com/images/I/71HAlrS1ivL._AC_SY450_.jpg" , saldoRequerido: 430, ganancias: 12  },
                { nombre: "ASUS Laptop Vivobook 16/16 WUXGA/Intel Core i9 13va 14 núcleos", imagen: "https://m.media-amazon.com/images/I/81UTn0JZnSL._AC_SY450_.jpg", saldoRequerido: 435, ganancias: 13  },
                { nombre: "Tableta de 10.1 Pulgadas para Android 11.0, 8GB 128GB ROM", imagen: "https://m.media-amazon.com/images/I/71bX2FKQEEL._AC_SY450_.jpg", saldoRequerido: 440, ganancias: 13  },
                { nombre: "AOC G2590FX - Monitor de Juegos sin Marco, FHD 1920 x 1080", imagen: "https://m.media-amazon.com/images/I/71+WEgcPJcL._AC_SY300_SX300_.jpg", saldoRequerido: 445, ganancias: 12  },
                { nombre: "Monitor Gamer ASUS MG278Q, 27", imagen: "https://m.media-amazon.com/images/I/61ADWjt3nRL.__AC_SY300_SX300_QL70_ML2_.jpg", saldoRequerido: 450, ganancias: 11  },
                { nombre: "RUBOQE Smartwatch Reloj Inteligente Mujer", imagen: "https://m.media-amazon.com/images/I/81gZ1J5RB0L._AC_SY450_.jpg", saldoRequerido: 455, ganancias: 10  },
                { nombre: "TCL Smart TV Pantalla 85Q5K Google TV QLED 4K Google Assistant", imagen: "https://m.media-amazon.com/images/I/61SOqaYmf3L._AC_SY450_.jpg", saldoRequerido: 760, ganancias: 17  },
                { nombre: "Xbox Series X 1TB Consola", imagen: "https://m.media-amazon.com/images/I/616klipzdtL._AC_SX679_.jpg", saldoRequerido: 460, ganancias: 13  },
                { nombre: "HYUNDAI HYTab Plus 10.1, Octa-Core T606, HD IPS 1280x800, 4GB/128GB, 8MP/13M", imagen: "https://m.media-amazon.com/images/I/61Fyt7DvQyL._AC_SY450_.jpg" , saldoRequerido: 465, ganancias: 11  },
                { nombre: "Apple Computadora de Escritorio Todo-en-uno iMac 2023", imagen: "https://m.media-amazon.com/images/I/717lOaKdqQL._AC_SX466_.jpg", saldoRequerido: 470, ganancias: 10  },
                { nombre: "Dell Optiplex 3070 Computadora Escritorio SFF", imagen: "https://m.media-amazon.com/images/I/61LpKsjSGIL._AC_SY450_.jpg", saldoRequerido: 475, ganancias: 12  },
                { nombre: "SAMSUNG Celular Galaxy Z Flip 6 Azul Claro 12GB RAM ", imagen: "https://m.media-amazon.com/images/I/510eJVItgvL._AC_SY450_.jpg", saldoRequerido: 885, ganancias: 13  }
                ];

        const listaPedidosVIP3 = [
        { nombre: "Cargador para Garmin Lily", imagen: "https://m.media-amazon.com/images/I/515ovWjEo4L._SX466_.jpg", saldoRequerido: 899, ganancias: 31 },
        { nombre: "Yarzkrg Mini Drone Profesional HelicóPtero RC PortáTil RC", imagen: "https://m.media-amazon.com/images/I/51YMguaL-iL._AC_SY450_.jpg", saldoRequerido: 910, ganancias: 26 },
        { nombre: "Sony EX14AP Audífonos con micrófono In-Ear manos libres, Negro", imagen: "https://m.media-amazon.com/images/I/416636oHkoL.__AC_SY300_SX300_QL70_ML2_.jpg", saldoRequerido: 921, ganancias: 29 },
        { nombre: "Control Inalámbrico Ghost Cipher - Edición Especial", imagen: "https://m.media-amazon.com/images/I/715TtgfxgSL.__AC_SX300_SY300_QL70_ML2_.jpg", saldoRequerido: 1200, ganancias: 32 },
        { nombre: "ANNA TOSANI Aspiradora de Mano", imagen: "https://m.media-amazon.com/images/I/71+2eVi1v+S._AC_SX679_.jpg", imagen: "", saldoRequerido: 943, ganancias: 28 },
        { nombre: "RCA Batidora de Mano RC-093 con 7 Velocidades", imagen: "https://m.media-amazon.com/images/I/61WfQ6iZ4JL._AC_SX679_.jpg", saldoRequerido: 954, ganancias: 19 },
        { nombre: "Oster® Cafetera, de 5 Tazas, con Filtro Permanente, Negro", imagen: "https://m.media-amazon.com/images/I/71eCyQLsMML._AC_SX679_.jpg", saldoRequerido: 965, ganancias: 27 },
        { nombre: "Sandwichera para 2 Piezas Placas Antiadherente Timco SA-811", imagen: "https://m.media-amazon.com/images/I/71gwayAC2kL._AC_SX679_.jpg", saldoRequerido: 976, ganancias: 31 },
        { nombre: "Licuadora Oster de 3 velocidades", imagen: "https://tse3.mm.bing.net/th?id=OIP.r3IBOpJHVr0dSLM4xcBOLAHaHa&w=200&h=200&c=7", saldoRequerido: 987, ganancias: 21 },
        { nombre: "Horno de microondas Whirlpool de 1.1 pies cúbicos", imagen: "https://tse3.mm.bing.net/th?id=OIP.thBECbD5k9RfBSwZRCdyhQHaHa&w=200&h=200&c=7", saldoRequerido: 998, ganancias: 20 },
        { nombre: "Freidora de aire Hamilton Beach de 3.5 litros", imagen: "https://tse4.mm.bing.net/th?id=OIP.PJyaLT65KY92heLzBMeKFAHaHa&w=200&h=200&c=7", saldoRequerido: 2000, ganancias: 81 },
        { nombre: "Sandwichera Oster 2 en 1", imagen: "https://tse2.mm.bing.net/th?id=OIP.AL2iRJnsHPFdGUcTGfxmJQHaHa&w=200&h=200&c=7", saldoRequerido: 1020, ganancias: 23 },
        { nombre: "Batidora de mano RCA de 7 velocidades", imagen: "https://tse2.mm.bing.net/th?id=OIP.K3hab-lH7Vp0LkfUEWs6agHaHb&w=200&h=200&c=7", saldoRequerido: 1031, ganancias: 22 },
        { nombre: "Procesador de alimentos Black+Decker", imagen: "https://tse4.mm.bing.net/th?id=OIP.vGS1WRJeh8dFtjQbAJTYpQAAAA&w=200&h=200&c=7", saldoRequerido: 1042, ganancias: 18 },
        { nombre: "Báscula digital de cocina Amazon Basics", imagen: "https://tse2.mm.bing.net/th?id=OIP.z74OQJHXWUsamXYXSI8LPQHaIw&w=200&h=236&c=7", saldoRequerido: 1053, ganancias: 27 },
        { nombre: "Arrocera Oster de 1.8 litros", imagen: "https://tse3.mm.bing.net/th?id=OIP.h1fRaGQWY8PzgxxqwByPWwHaHa&w=200&h=200&c=7", saldoRequerido: 1064, ganancias: 25 },
        { nombre: "Tostador de pan Hamilton Beach", imagen: "https://tse1.mm.bing.net/th?id=OIP.vbIVNR_MwjZbR3YboKRkRwHaHa&w=200&h=200&c=7", saldoRequerido: 1075, ganancias: 26 },
        { nombre: "Cafetera de cápsulas Nespresso", imagen: "https://tse3.mm.bing.net/th?id=OIP.UmBZCrQih52lEJB1FbKwygHaJE&w=200&h=245&c=7", saldoRequerido: 4120, ganancias: 161 },
        { nombre: "Hervidor eléctrico de acero inoxidable", imagen: "https://tse3.mm.bing.net/th?id=OIP.1JES2b5KQ6wnYh4pp7UF-wHaHa&w=200&h=200&c=7", saldoRequerido: 1097, ganancias: 30 },
        { nombre: "Extractor de jugo Philips", imagen: "https://tse1.mm.bing.net/th?id=OIP.vJQoPl663xzWAm1Ns6fkigHaMc&w=200&h=336&c=7", saldoRequerido: 1108, ganancias: 21 },
        { nombre: "Plancha de vapor Tefal", imagen: "https://tse3.mm.bing.net/th?id=OIP.snc-7tgz5eJxUHVknhc9lwHaHY&w=200&h=199&c=7", saldoRequerido: 1119, ganancias: 17 },
        { nombre: "Cafetera de goteo Cuisinart", imagen: "https://tse1.mm.bing.net/th?id=OIP.hUd2_CPlLcg2emB7R2DcnwHaHa&w=200&h=200&c=7", saldoRequerido: 1130, ganancias: 16 },
        { nombre: "Licuadora de vaso Ninja", imagen: "https://tse3.mm.bing.net/th?id=OIP.iWOZb8ID5zepkaREhWaw-AAAAA&w=200&h=405&c=7", saldoRequerido: 1141, ganancias: 22 },
        { nombre: "Horno tostador Oster", imagen: "https://tse4.mm.bing.net/th?id=OIP.bUjYFaZvLqgEqnUZCQDgGwHaHa&w=200&h=200&c=7", saldoRequerido: 1152, ganancias: 23 },
        { nombre: "Freidora de aire Cosori", imagen: "https://tse4.mm.bing.net/th?id=OIP.Chew9NUBwNCMHr2KcUOabQHaIY&w=200&h=226&c=7", saldoRequerido: 1163, ganancias: 30 },
        { nombre: "Sandwichera eléctrica Oster", imagen: "https://tse1.mm.bing.net/th?id=OIP.WPyjgQ9j-XaOjXblwTYS8gHaHa&w=200&h=200&c=7", saldoRequerido: 5800, ganancias: 210 },
        { nombre: "Batidora de mano KitchenAid", imagen: "https://tse1.mm.bing.net/th?id=OIP.Fwf8lYOWjxw-3adp-vbdVAHaF5&w=200&h=159&c=7", saldoRequerido: 1185, ganancias: 25 },
        { nombre: "Cafetera Oster de 12 tazas", imagen: "https://tse3.mm.bing.net/th?id=OIP.RWYwnGgR25D_3WUR66RtiwHaHa&w=200&h=200&c=7", saldoRequerido: 1196, ganancias: 20 },
        { nombre: "Eureka Blaze NES210 Aspiradora Stick 3 en 1, Color Negro con Amarillo", imagen: "https://m.media-amazon.com/images/I/51jyLFR7V9L.__AC_SX300_SY300_QL70_ML2_.jpg", saldoRequerido: 1207, ganancias: 29 },
        { nombre: "Razer Orochi V2 - Ratón Inalámbrico para Juegos", imagen: "https://tse4.mm.bing.net/th?id=OIP.zlDTgCH_O6bIwAcS_ArE4gHaHa&w=200&h=200&c=7", saldoRequerido: 1218, ganancias: 31 },
        { nombre: "Funda Spigen Ultra Hybrid para iPhone 13", imagen: "https://tse1.mm.bing.net/th?id=OIP.nzH5irJ0OPvkNXHPTeLuCAHaHa&w=200&h=200&c=7", saldoRequerido: 9100, ganancias: 322 },
        { nombre: "Cargador Anker PowerPort III Nano", imagen: "https://tse4.mm.bing.net/th?id=OIP.8DK8FMROK-uAgfDUxButDAHaHa&w=200&h=200&c=7", saldoRequerido: 1240, ganancias: 24 }
]

        let listaPedidos = [];
        if (saldoDisponible >= 96 && saldoDisponible <= 379) {
            listaPedidos = listaPedidosVIP1;
        } else if (saldoDisponible >= 380 && saldoDisponible <= 898) {
            listaPedidos = listaPedidosVIP2;
        } else if (saldoDisponible >= 899 && saldoDisponible <= 150000) {
            listaPedidos = listaPedidosVIP3;
        }
    
    
        let indicePedido = parseInt(localStorage.getItem("indicePedido_" + telefono)) || 0;

        btnOrden.addEventListener("click", function () {
            if (contadorTareas > 0) {
           
                let pedidosPendientes = JSON.parse(localStorage.getItem("pedidosPendientes_" + telefono)) || [];
    
                if (pedidosPendientes.length > 0) {
                    
                    mensajePedidoPendiente.style.display = "block";
    
                    setTimeout(function () {
                        mensajePedidoPendiente.style.display = "none";
                    }, 2000);
    
                    return;
                }
    
                mensajePedidoPendiente.style.display = "none";
    
                overlay.style.display = "flex"; 
                loadingImage.src = "https://cdn.dribbble.com/users/2572904/screenshots/17169793/compressed.gif"; 
                loadingText.innerText = "Orden aceptada..."; 
    
                setTimeout(function () {
                    overlay.style.display = "none"; 
    
                    let saldoCuenta = parseFloat(localStorage.getItem("saldoCuenta_" + telefono) || "0");
    
                   
                    let pedido = listaPedidos[indicePedido];
    
                    let nuevoPedido = {
                        id: pedidosPendientes.length + 1,
                        nombre: pedido.nombre,
                        imagen: pedido.imagen,
                        saldoRequerido: pedido.saldoRequerido,
                        ganancias: pedido.ganancias,
                        saldoDisponible: saldoCuenta 
                    };
    
                   
                    pedidosPendientes.push(nuevoPedido);
    
                  
                    localStorage.setItem("pedidosPendientes_" + telefono, JSON.stringify(pedidosPendientes));
                    console.log("Pedidos pendientes actualizados para el usuario:", pedidosPendientes);
    
                  
                    contadorTareas--;
                    localStorage.setItem("contadorTareas_" + telefono, contadorTareas.toString());
    
                   
                    if (contadorTareas <= 0) {
                      
                        localStorage.removeItem("vipActivo_" + telefono);
                    }
    
                   
                    indicePedido = (indicePedido + 1) % listaPedidos.length;
                    localStorage.setItem("indicePedido_" + telefono, indicePedido); 
    
                }, 2000); 
            } else {
                console.log("No tienes tareas disponibles.");
            }
        });
    });
