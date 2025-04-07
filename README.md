# SoftCheck Landing Page

Esta es una landing page moderna y atractiva para SoftCheck, una solución autónoma de aprobación de software para empresas. Está construida con Next.js y utiliza Tailwind CSS para el diseño.

## Características

- Diseño moderno y minimalista con tema basado en tonos azules
- Animaciones fluidas utilizando Framer Motion
- Totalmente responsive para dispositivos móviles y de escritorio
- Secciones claramente estructuradas para presentar la oferta de valor de SoftCheck

## Secciones

1. **Hero** - Mensaje principal con llamado a la acción "Book a Demo"
2. **Our Flow** - Diagrama de flujo animado que muestra el proceso de solicitud de software
3. **Partners** - Muestra de empresas que confían en SoftCheck
4. **Advantages** - Ventajas competitivas del producto
5. **Platform Look** - Vista previa del aspecto de la plataforma
6. **Pricing** - Planes de precios claros y estructurados
7. **FAQ** - Preguntas frecuentes
8. **Footer** - Enlaces e información adicional

## Configuración del Proyecto

### Requisitos previos

- Node.js 14.x o superior
- npm o yarn

### Instalación

1. Clona este repositorio:
```bash
git clone <repo-url>
cd softcheck-landing
```

2. Instala las dependencias:
```bash
npm install
# o
yarn install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## Tecnologías utilizadas

- Next.js - Framework de React
- TypeScript - Tipado estático
- Tailwind CSS - Framework de CSS utilitario
- Framer Motion - Biblioteca de animaciones
- React Intersection Observer - Para animaciones basadas en el scroll

## Personalización

Para personalizar colores y estilos, consulta los archivos:
- `tailwind.config.js` - Configuración de colores y temas
- `src/app/globals.css` - Estilos globales y clases de utilidad personalizadas

## Despliegue

Para construir el proyecto para producción:

```bash
npm run build
# o
yarn build
```

Luego puedes desplegar la carpeta `.next` en cualquier proveedor de hosting compatible con Next.js como Vercel, Netlify o AWS Amplify. 