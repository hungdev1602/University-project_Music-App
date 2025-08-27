// Preview ảnh
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage) {
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
  const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");

  uploadImageInput.addEventListener("change", () => {
    const file = uploadImageInput.files[0];
    if(file) {
      uploadImagePreview.src = URL.createObjectURL(file);
    }
  });
}
// Hết Preview ảnh

// Preview audio
const uploadAudio = document.querySelector("[upload-audio]")
if(uploadAudio){
  const uploadAudioInput = uploadAudio.querySelector("[upload-audio-input]")
  const uploadAudioPlay = uploadAudio.querySelector("[upload-audio-play]")
  const uploadAudioSource = uploadAudioPlay.querySelector("source")
  
  uploadAudioInput.addEventListener("change", () => {
    const file = uploadAudioInput.files[0]
    if(file){
      uploadAudioPlay.style.display = "block"
      uploadAudioSource.src = URL.createObjectURL(file)
      uploadAudioPlay.load()
    }
  })
}