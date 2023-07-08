import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestore, AngularFirestoreDocument, docChanges } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-competences',
  templateUrl: './competences.component.html',
  styleUrls: ['./competences.component.scss']
})
export class CompetencesComponent implements OnInit {

  array:any[] = [];
  userState:any;
  closeResult!: string;
  user:any;
  comp:any;
  ucompid :any;
  constructor(private modalService: NgbModal,public afs: AngularFirestore,private firestore: AngularFirestore,public router: Router,public translate:TranslateService) {
    this.userState = JSON.parse(localStorage.getItem('userinfo') || '{}');
    this.comp = JSON.parse(localStorage.getItem('comp') || '{}');

    afs.collection('nusers').doc(this.userState.id).collection('competences').get()
    .subscribe(async (comp: { docs: any[]; }) => {
      if(comp.docs.length === 0)
      {
        afs.collection('nusers').doc(this.userState.id).collection('competences').doc('init')
        .set({id:"",})
      }

else{
  this.afs.collection('nusers').doc(this.userState.id).collection('competences').get()
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
    const pert = document.getElementById('percentage')  as HTMLInputElement
    const db = document.getElementById('datedeb')  as HTMLInputElement
    const df = document.getElementById('datefin')  as HTMLInputElement
    const cat = document.getElementById('cathegory')  as HTMLInputElement

    if(title.value.length != 0 && pert.value.length != 0 && db.value.length != 0 && df.value.length != 0)
    {
      let id = this.createId();
      let p : number = +pert.value
      this.afs.collection('nusers').doc(this.userState.id).collection('competences').doc(id)
      .set({
        id:id,
        title:title.value,
        percentage:p,
        dateDebut:db.value,
        dateFin:df.value,
        cathegory:cat.value,
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
    this.ucompid = id
  }

  modifycomp()
  {
    const title = document.getElementById('title1') as HTMLInputElement
    const pert = document.getElementById('percentage1')  as HTMLInputElement
    const db = document.getElementById('datedeb1')  as HTMLInputElement
    const df = document.getElementById('datefin1')  as HTMLInputElement
    const cat = document.getElementById('cathegory1')  as HTMLInputElement
    console.log(this.ucompid)

   if(title.value)
   {
    this.afs.collection('nusers').doc(this.userState.id).collection('competences').doc(this.ucompid).update({title:title.value})
    window.location.reload()
   }

    if(pert.value)
    {
      let p : number = +pert.value
      this.afs.collection('nusers').doc(this.userState.id).collection('competences').doc(this.ucompid).update({percentage:p})
      window.location.reload()
    }


    if(db.value)
    {
      this.afs.collection('nusers').doc(this.userState.id).collection('competences').doc(this.ucompid).update({dateDebut:db.value})
      window.location.reload()
    }

    if(df.value)
    {
      this.afs.collection('nusers').doc(this.userState.id).collection('competences').doc(this.ucompid).update({dateFin:df.value})
      window.location.reload()
    }

    if(cat.value)
    {
      this.afs.collection('nusers').doc(this.userState.id).collection('competences').doc(this.ucompid).update({cathegory:cat.value})
      window.location.reload()
    }

  }

  deletecomp()
  {
    this.afs.collection('nusers').doc(this.userState.id).collection('competences').doc(this.ucompid).delete()
    window.location.reload()
  }

  confirm() {
    if(confirm()) {
      this.deletecomp()
    }
  }
}
