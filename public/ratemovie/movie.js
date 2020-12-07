window.addEventListener('load', function () {
    document.getElementById('rateBtn').addEventListener('change', () =>{
        rating = document.getElementById('rateBtn')
        if(!(rating.value >= 0 && rating.value <= 10) || isNaN(rating.value)){
            window.alert("Improper Rate Value")
            rating.value = 5
        } else {
            form = document.getElementById('change')
            formData = form.getAttribute('action')
            form.setAttribute('action', formData+=rating.value)
        }
    })
    document.getElementById('commentContent').addEventListener('change', () =>{
        comment = document.getElementById('commentContent')
        if(String(comment.value).length > 200){
            comment.value = String(comment.value).substring(0,200)
        }
        link = document.getElementById('cmtLnk')
        linkData = link.getAttribute('href')
        link.setAttribute('href', linkData+=comment.value)
    })
});