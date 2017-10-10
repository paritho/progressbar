$(function(){
    $('#file-upload').hide();
    $('#upload-button').click(()=>{
        $('.progressBar').css('border','1px solid black');
        $('#file-upload').click();
    });
    
    $('#file-upload').change(selectFile);
});
    
    let reader, progress = document.getElementsByClassName('percent')[0];
     
    function handleErrors(e){
        switch(e.target.error.code){
            case e.target.error.NOT_FOUND_ERR:
                alert('The file could not be found');
                break;
            case e.target.error.NOT_READABLE_ERR:
                alert("We couldn't read the file, please try again later");
                break;
            default:
                alert('Something went wrong, pleast try again later');
        }
    }
    
    function updateProgress(e){
        if(e.lengthComputable){
            let perLoad = Math.round((e.loaded / e.total) * 100);
            // if not loaded, update the bar
            if(perLoad < 100) progress.style.width = perLoad + "%";
            // otherwise it's loaded
            else {
                progress.classList += ' loaded';
                document.getElementById('complete').style.opacity = '1';
            }
        }
    }
    
    function selectFile(e){
        // reset progress
        progress.style.width = '0%';
        
        //set filename in progress bar
        let fileName = escape(e.target.files[0].name);
        document.getElementById('fileName').innerHTML = fileName;
        
        reader = new FileReader();
        reader.onerror = handleErrors;
        reader.onprogress = updateProgress;
        reader.onabort = () => {alert('File upload aborted');};
        reader.onload = (e) => {progress.style.width = '100%'; };
        
        reader.readAsBinaryString(e.target.files[0]);
    }
