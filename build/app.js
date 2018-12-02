var quill = new Quill('#editor', {
  modules: {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['image', 'code-block']
    ]
  },
  placeholder: 'Compose an epic...',
  theme: 'snow'  // or 'bubble'
});

var toolbar = quill.getModule('toolbar');
toolbar.addHandler('image', imageHandler);


var imageHandler = function() {
  var range = this.quill.getSelection();
  var value = prompt('What is the image URL');
  this.quill.insertEmbed(range.index, 'image', value, Quill.sources.USER);
}

var save = function() {
    var xhttp = new XMLHttpRequest();
    var delta = quill.getContents();
    var id = document.getElementById("blogpostid").innerText;
    var postData = {
        id: id,
        quill_delta: delta
    };
    xhttp.onreadystatechange = function(event) {
      try {
        document.getElementById("status").innerHTML = event.target.responseText;
      } catch (error) {
        console.error(error);
      }
    };

    xhttp.onerror = function(event) {
      var error = "error occurred while trying to create/update current blogpost";
      console.error(error);
      window.alert(error);
    };

    xhttp.open("POST", "edit.html", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(postData));
};