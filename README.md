# Nexo Digital — Web de ventas (cursos, ebooks, web y apps)

Sitio web **moderno y legal** para vender cursos online, ebooks y servicios de desarrollo web y de aplicaciones móviles. Preparado para la **verificación de Google Business Profile** y para desplegarse fácilmente en **Render**.

> Fecha de creación del sitio: **2024**.

---

## ✨ Características

- **Diseño moderno y responsive** (HTML5 + CSS3 + JavaScript, sin frameworks ni build).
- **Selector de moneda** en la cabecera: **USD · COP · CLP** con conversión automática de todos los precios.
- **Cumplimiento legal (España/UE):** Aviso legal (LSSI-CE), Términos y condiciones, Política de privacidad (RGPD/LOPDGDD), Política de cookies y Política de devoluciones.
- **SEO:** meta tags, Open Graph, Twitter Cards, `sitemap.xml`, `robots.txt` y datos estructurados JSON-LD (`LocalBusiness`, `Organization`, `Service`, `ContactPage`, `AggregateRating`).
- **Datos NAP** (Nombre, Dirección, Teléfono) consistentes para la verificación de Google Business Profile.
- **Banner de cookies** con consentimiento persistente.

## 📁 Estructura

```
.
├── index.html              # Inicio
├── cursos.html             # Catálogo de cursos
├── ebooks.html             # Catálogo de ebooks
├── servicios.html          # Desarrollo web y apps
├── sobre-nosotros.html     # Quiénes somos
├── contacto.html           # Contacto + datos NAP
├── blog.html               # Blog / SEO
├── legal/
│   ├── aviso-legal.html
│   ├── terminos.html
│   ├── privacidad.html
│   ├── cookies.html
│   └── devoluciones.html
├── assets/
│   ├── css/styles.css
│   └── js/main.js
├── robots.txt
├── sitemap.xml
├── render.yaml             # Blueprint para Render (sitio estático)
├── server.js               # Servidor Node opcional (Web Service)
└── package.json
```

---

## 🚀 Desplegar en Render

### Opción A — Static Site (recomendado, gratis)

1. Entra en [render.com](https://render.com) → **New** → **Static Site**.
2. Conecta este repositorio de GitHub (`Venta-de-app-bot-y-web`).
3. Configura:
   - **Build Command:** *(déjalo vacío)*
   - **Publish Directory:** `.`
4. Pulsa **Create Static Site**. ¡Listo!

> También puedes usar el botón **New → Blueprint** y Render leerá `render.yaml` automáticamente.

### Opción B — Web Service (Node)

1. **New** → **Web Service** → conecta el repositorio.
2. Configura:
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
3. Render asignará el puerto con la variable `PORT` (ya soportada por `server.js`).

---

## 🧪 Ejecutar en local

```bash
# Con Python
python3 -m http.server 8080

# o con Node
npm start
```

Luego abre `http://localhost:8080`.

---

## 💱 Monedas

Los precios base están en **USD** (atributos `data-price`). El JavaScript los convierte a **COP** y **CLP** con tipos de cambio de referencia y los formatea según el país. La moneda elegida se guarda en el navegador.

---

## 📞 Contacto

- **Nexo Digital**
- Dirección: Calle Gran Vía 45, 2º B, 28013 Madrid (España)
- Teléfono: +34 910 000 000
- Email: hola@nexodigital.es

> Los datos de contacto (CIF, dirección, teléfono) son de ejemplo: **reemplázalos por los reales** antes de la verificación de Google Business Profile.
