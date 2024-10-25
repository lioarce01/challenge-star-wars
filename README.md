Challenge Fullstack: Implementar una RESTful API que tome la información de la API de Star Wars (https://swapi.dev/).

Las techs a utilizar son NodeJS, queda a libre elección la herramienta para armar el API y ReactJS o NextJS para el frontend y se debe utilizar Typescript en los dos lados.

Objetivos: Crear una sincronización de información que corra en un cron para mandar los datos a una base de datos propia usando MongoDB. (Se puede usar cualquier ORM/ODM).

Las entidades que se deberian implementar son: People Films Starships Planets Solo se deben implementar endpoints de obtención de información.

Los 4 endpoints de listado de elementos deberia permitirme filtrar la informacion por al menos un atributo. Implementar los tests unitarios.

Diseñar y desarrollar una interfaz responsive que pueda mostrar la información del API a implementar.

Las vistas serian: Listado de cada entidad Poder ver un elemento de un listado con toda su información. En el listado debería poder paginar la información y tener una búsqueda local.

Se espera que el API se encuentre desplegado en algun servicio en la nube y el frontend se encuentre en vercel para poder hacer las pruebas correspondientes.

Criterio de Evaluación Este test va a estar evaluado de la siguiente manera:

Funcional: ¿La aplicación cumple con todos los puntos?

Code Quality: ¿El código se encuentra bien estructurado, limpio y es escalable?

UI/UX: ¿El frontend es intuitivo y visualmente posee una buena UX?
Creatividad: ¿Hay algún componente, feature o cuestión que destaque por sobre la consigna?

Testing: ¿Todos los test unitarios del backend están desarrollados para realmente probar la funcionalidad?

SWAPI swapi.dev The Star Wars API, or "swapi" (Swah-pee) is the world's first quantified and programmatically-accessible data source for all the data from the Star Wars canon universe! We've taken all the rich contextual stuff from the universe and formatted into...

Reglas Técnicas: Backend
Se busca un codigo con determinados lineamientos tecnicos.
Descripcion

No se admite commitear el .env
No se admite importar directamente los schemas de mongo dentro del controlador.
No se admite anys dentro del codigo.
