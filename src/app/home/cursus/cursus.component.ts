import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestore, AngularFirestoreDocument, docChanges } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-cursus',
  templateUrl: './cursus.component.html',
  styleUrls: ['./cursus.component.scss']
})
export class CursusComponent implements OnInit {

  array:any[] = [];
  userState:any;
  closeResult!: string;
  user:any;
  ucurid :any;
  constructor(private modalService: NgbModal,public afs: AngularFirestore,private firestore: AngularFirestore,public router: Router,public translate:TranslateService) {
    this.userState = JSON.parse(localStorage.getItem('userinfo') || '{}');

    afs.collection('nusers').doc(this.userState.id).collection('formations').get()
    .subscribe(async (comp: { docs: any[]; }) => {
      if(comp.docs.length === 0)
      {
        afs.collection('nusers').doc(this.userState.id).collection('formations').doc('init')
        .set({id:"",})
      }

else{
  this.afs.collection('nusers').doc(this.userState.id).collection('formations').get()
  .subscribe((userinfo: { docs: any[]; }) =>{
      userinfo.docs.forEach((doc: { data: () => any; }) => {
       this.array.push(doc.data())
        })
      })
    }
  })
  }


  ngOnInit(): void {
  }

  opentextera(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  getDismissReason(reason: any) {
    throw new Error('Method not implemented.');
  }

  addcomp()
  {
    const title = document.getElementById('title') as HTMLInputElement
    const db = document.getElementById('datedeb')  as HTMLInputElement
    const df = document.getElementById('datefin')  as HTMLInputElement
    const cat = document.getElementById('cathegory')  as HTMLInputElement

    if(title.value.length != 0 && db.value.length != 0 && df.value.length != 0)
    {
      let id = this.createId();
      console.log(id)
      this.afs.collection('nusers').doc(this.userState.id).collection('formations').doc(id)
      .set({
        id:id,
        diplome:title.value,
        ecole:db.value,
        periode:df.value,
        cathegorie:cat.value,
          })
          window.location.reload()
    }else{
       alert(this.translate.instant("alerts.alert6"))
    }
  }

  createId(){
    // Alphanumeric characters
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let autoId = '';
    for (let i = 0; i < 20; i++) {
      autoId += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return autoId;
  }

  saveid(id:string)
  {
    this.ucurid = id
  }

  modifycomp()
  {
    const title = document.getElementById('title1') as HTMLInputElement
    const db = document.getElementById('datedeb1')  as HTMLInputElement
    const df = document.getElementById('datefin1')  as HTMLInputElement
    const cat = document.getElementById('cathegory1')  as HTMLInputElement
    console.log(this.ucurid)

   if(title.value)
   {
    this.afs.collection('nusers').doc(this.userState.id).collection('formations').doc(this.ucurid).update({diplome:title.value})
    window.location.reload()
   }

    if(db.value)
    {
      this.afs.collection('nusers').doc(this.userState.id).collection('formations').doc(this.ucurid).update({ecole:db.value})
      window.location.reload()
    }

    if(df.value)
    {
      this.afs.collection('nusers').doc(this.userState.id).collection('formations').doc(this.ucurid).update({periode:df.value})
      window.location.reload()
    }

    if(cat.value)
    {
      this.afs.collection('nusers').doc(this.userState.id).collection('formations').doc(this.ucurid).update({cathegorie:cat.value})
      window.location.reload()
    }

  }

  deletecur()
  {
    this.afs.collection('nusers').doc(this.userState.id).collection('formations').doc(this.ucurid).delete()
    window.location.reload()
  }

  confirm() {
    if(confirm()) {
      this.deletecur()
    }
  }
}

