document.addEventListener('DOMContentLoaded',function(){

  const heightSel=document.getElementById('filter-height');
  const weightSel=document.getElementById('filter-weight');
  const styleSel=document.getElementById('filter-style');
  const clearBtn=document.getElementById('clear-filters');
  if(heightSel||weightSel||styleSel){
    [heightSel,weightSel,styleSel].forEach(el=>el&&el.addEventListener('change',applyFilters));
    clearBtn&&clearBtn.addEventListener('click',()=>{heightSel.value='any';weightSel.value='any';styleSel.value='any';applyFilters();});
  }

  function applyFilters(){
    const cards=document.querySelectorAll('#creator-cards .card');
    const hv=heightSel?heightSel.value:'any';
    const wv=weightSel?weightSel.value:'any';
    const sv=styleSel?styleSel.value:'any';
    cards.forEach(c=>{
      let show=true;
      const ch=c.getAttribute('data-height');
      const cw=c.getAttribute('data-weight');
      const cs=c.getAttribute('data-style');
      if(hv!=='any' && ch!==hv) show=false;
      if(wv!=='any' && cw!==wv) show=false;
      if(sv!=='any' && cs!==sv) show=false;
      c.style.display = show? '' : 'none';
    });
  }


  const imageInput=document.getElementById('image-input');
  const preview=document.getElementById('preview');
  if(imageInput && preview){
    imageInput.addEventListener('change',function(e){
      const f=e.target.files[0];
      if(!f) return;
      if(!f.type.startsWith('image/')){alert('Please select an image file'); return;}
      const reader=new FileReader();
      reader.onload=function(ev){preview.src=ev.target.result;}
      reader.readAsDataURL(f);
    });
  }

  const uploadForm=document.getElementById('upload-form');
  if(uploadForm){
    uploadForm.addEventListener('submit',function(e){
      e.preventDefault();
      const desc=document.getElementById('desc').value.trim();
      const tags=document.getElementById('tags').value.trim();
      const height=document.getElementById('height').value;
      const weight=document.getElementById('weight').value;
      if(!desc || !tags || !height || !weight){
        alert('Please fill all fields');
        return;
      }
      alert('Upload preview saved. (Replace with real upload backend)');
      uploadForm.reset(); preview.src='assets/placeholder-1.jpg';
    });
  }


  const budget=document.getElementById('budget');
  const budgetVal=document.getElementById('budget-value');
  if(budget && budgetVal){
    budget.addEventListener('input',()=>budgetVal.textContent=`$${budget.value}`);
  }
  const hireForm=document.getElementById('hire-form');
  if(hireForm){
    hireForm.addEventListener('submit',function(e){
      e.preventDefault();
      alert('Request Sent!');
      hireForm.reset(); budgetVal.textContent='$500';
    });
  }


  const loginForm=document.getElementById('login-form');
  if(loginForm){
    loginForm.addEventListener('submit',function(e){
      e.preventDefault();
      const email=document.getElementById('login-email').value.trim();
      const pass=document.getElementById('login-password').value;
      if(!email || !pass){
        alert('Please enter email and password');
        return;
      }

      alert('Logged in as ' + email);
      window.location.href='explore.html';
    });
  }
});
