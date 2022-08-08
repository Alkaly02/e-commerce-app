export default function replaceIcon(file, imgUrl){
    const img = document.querySelector('#img-upload')
    if(file && imgUrl){
        document.querySelector('.icon-upload').style.display = 'none'
        img.style.display = 'block'
        img.style.width = '100%'
        img.style.height = '100%'
        img.style.objectFit = 'contain'
        img.setAttribute('src', imgUrl)
    }
    // else{
    //     document.querySelector('.icon-upload').style.display = 'block'
    //     img.style.display = 'none'
    //     img.setAttribute('img', '')
    // }
}