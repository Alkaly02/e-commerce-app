export default function replaceIcon(file, imgUrl){
    const img = document.querySelector('#img-upload')
    const icon = document.querySelector('.icon-upload')
    const label = document.querySelector('#bg-label')
    if(imgUrl && icon !== null){
        icon.style.display = 'none'
        label.style.backgroundColor = 'transparent'
        img.style.display = 'block'
        img.style.width = '100%'
        img.style.height = '100%'
        img.style.objectFit = 'contain'
        img.setAttribute('src', imgUrl)
    }
    else if(imgUrl && icon.style.display === 'none'){
        label.style.backgroundColor = 'transparent'
        img.setAttribute('src', imgUrl)
    }
    // else{
    //     document.querySelector('.icon-upload').style.display = 'block'
    //     img.style.display = 'none'
    //     img.setAttribute('img', '')
    // }
}