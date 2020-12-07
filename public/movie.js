window.addEventListener('load', function () {
    document.getElementById('rateBtn').addEventListener('change', () =>{
        rating = document.getElementById('rateBtn')
        if(!(rating.value >= 0 && rating.value <= 10) || isNaN(rating.value)){
            window.alert("Improper Rate Value")
            rating.value = 5
        }
    })
    document.getElementById('commentBtn').addEventListener('change', () =>{
        comment = document.getElementById('rateBtn')
        
    })
});