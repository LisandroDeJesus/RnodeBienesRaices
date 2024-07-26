import  {Dropzone} from 'dropzone'
const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');



Dropzone.options.imagen = {
    dictDefaultMessage:'Sube tus imagenes aqui',
    acceptedFiles: '.png, .jpg, .jpeg',
    maxFilesize: 5,
    maxFiles: 2,
    parallelUploads:2,
    autoProcessQueue:false,
    addRemoveLinks:true,
    dictRemoveFile:'Borrar Archivo',
    dictMaxFilesExceeded: 'Limite de fotos alcanzado',
    headers: {
        'CSRF-Token':token
    },
    paramName:'imagen',
    init: function(){
         const dropzone = this
         const btnPublcar = document.querySelector("#publicar")

         btnPublcar.addEventListener('click', function(){
            dropzone.processQueue()
         })

         dropzone.on('queuecomplete', function(){
            if(dropzone.getActiveFiles().length === 0 ){
                window.location.href = './mis-propiedades'
            }
         })
    }
}
