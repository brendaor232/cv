//cargar Service Worker
if('serviceWorker' in navigator)
{
    console.log("Puedes usar el service worker");

    navigator.serviceWorker.register('sw.js')
                    .then(res => console.log("SW cargado correctamente",res))
                    .catch(err => console.log("Service Worker No se ha podido registrar",err));

}else{
    console.log("No se puede usar el service worker");
}
