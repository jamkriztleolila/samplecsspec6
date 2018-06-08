<div>
<h3 style= "font-weight:  normal;padding: 10px;">Good Day <?=$firstName?>!</h3>

<h4 style= "margin-left:5em;font-weight:  normal;">
  This email congratulates your successful registration!

  <br><br>Please confirm your email address as part of the registration process and then wait for your
  <br> School's Head Librarian to accept your registration. Click or copy the link below to confirm
  <br>your email address:
  <a href = "http://localhost:8000/LibrarySystem/register/confirmation/<?=$emailId?>">
    http://localhost:8000/LibrarySystem/register/confirmation/<?=$emailId?>
  </a>

  <br><br>For the mean time you may still
  <a href = "http://localhost:8000/LibrarySystem/OPAC"> visit the Library System's OPAC</a> and borrow books.
  <br>However, you will not be able to take home your borrowed books since you have
  <br>not been fully authorized by your Head Librarian.

</h4>

</div>
