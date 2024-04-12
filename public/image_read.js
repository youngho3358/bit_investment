const readURL = (input) =>{
    console.log(input)
    console.log(input.files[0])
    const file = input.files[0];

    if(file != ""){
        let reader = new FileReader();//파일을 불러오는 기능
        reader.readAsDataURL(file)
        reader.onload = (e) =>{
        console.log(e.target.result);
        document.getElementById("img").src = e.target.result;
        }
    }else{

    }
}