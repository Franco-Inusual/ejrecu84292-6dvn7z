import { Component, OnInit } from '@angular/core';
import { Destinatario } from '../../models/destinatario';
import { MailsService } from '../../services/mails.service';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css'],
})
export class PruebaComponent implements OnInit {
  content: string;
  
  constructor(
    private mailsService: MailsService,
  ) {}

  ngOnInit() {
  
    this.content = `<html>
    <cuerpo>
        <div align="center"><img src='https://mandatario50.com.ar/imagenes_mail/escudo_bsas.jpg' width="100" height="100"></div><br/>
        <h6 align="center">GOBIERNO DE LA CIUDAD AUTÓNOMA DE BUENOS AIRES<br/>
        ADMINISTRACIÓN GUBERNAMENTAL DE INGRESOS PÚBLICOS<br/>
                              DIRECCIÓN GENERAL DE RENTAS</b><br/></h6>
                             <p><div align="center">“2022 – Año del 40° Aniversario de la Guerra De Malvinas. 
                          En homenaje a los veteranos y caídos en la defensa de las Islas Malvinas y el Atlántico Sur”.</div>
      <p><h1 align="center"><b>AVISO DE EJECUCIÓN FISCAL&nbsp;-&nbsp;EMBARGO EN PROCESO</b></h1>
      <br>
  <br/><h5 align="justify"><h5 align="right">Buenos Aires, """+date_format(now)+""" de <b>2022</b></h5></h5><br/>

  <div align="justify"><b>Ref.: DEUDA EN JUICIO <br/> 
  FUERO CAyT – CABA </b><br/>


  &nbsp;&nbsp;&nbsp;La Administración Gubernamental de Ingresos Públicos continúa desarrollando acciones que buscan promover el cumplimiento de las obligaciones fiscales para poder obtener los recursos que permitan mejorar la calidad de vida de todos los vecinos de la Ciudad de Buenos Aires. En ese sentido y en el contexto actual, esta Administración, viene realizando <b>un gran esfuerzo fiscal para aliviar la situación de los contribuyentes más damnificados</b>, prorrogando la mayoría de los vencimientos, pero al mismo tiempo desarrollando acciones para combatir la evasión y promover el cumplimiento de las obligaciones tributarias.<br/>

  &nbsp;&nbsp;&nbsp;Del procesamiento de la información de nuestros registros, surge que Usted figura con <b>deuda pendiente de regularización</b>, correspondiente al impuesto de referencia. Se le informa que la misma ha sido <b>transferida para su cobro por vía judicial</b> a la sección a mi cargo. <br/>

  &nbsp;&nbsp;&nbsp;A fines de regularizar su situación judicial, solicitamos se contacte con nosotros a través de los siguientes medios:<br/>

  <dd>- Telefónicamente al: <b>(011)5218-7683/5274-0822/5274-0823/5218-3047</b><br/>
  <b>- Por casilla de whatsapp: Línea  - Link de whatsapp 

  <b>- Oficina -previa solicitud de turno-:</b> Uruguay 766 PB "of" 4, CABA, de lunes a viernes, de 10 a 15 hrs. <br/></dd>

  &nbsp;&nbsp;&nbsp;Una vez iniciado el contacto, se le indicará como proseguir para realizar la cancelación correspondiente. Cabe destacar, que debido al contexto actual de Distanciamiento Social Preventivo y Obligatorio, decretado por las autoridades nacionales y locales, podrá efectuar la cancelación de los referidos conceptos de deuda, bajo modalidad online. <br/>

  &nbsp;&nbsp;&nbsp;Caso contrario, he recibido precisas instrucciones de <b>proseguir sumariamente con la ejecución fiscal ante la Justicia</b>. La acción judicial conlleva la urgente toma de medidas tendientes a  resguardar  debidamente  el  crédito fiscal, como el <b>embargo de cuentas, el cual se encuentra en proceso, y/o embargo de inmuebles, la inhibición personal o de bienes, el secuestro de automotores objeto de ejecución</b>, según corresponda en cada caso. <br/>

  <b>&nbsp;&nbsp;&nbsp;Plan de Facilidades:</b> Conforme a lo previsto por la normativa vigente, le informamos que cuenta  con  la  opción  de  regularizar  su  deuda  a  través  del  Plan  de  Facilidades  Res.  Nº 890/MHFGC/20, el cual permite financiar la deuda reclamada en hasta 36 cuotas. Podrá consultar más información al respecto ingresando a: www.agip.gob.ar sección “Planes de Facilidades”. <br/>

  <b>&nbsp;&nbsp;&nbsp;Importante:</b> Atento al estado avanzado en el que se encuentra la causa judicial en su contra, es de suma importancia que inicie el contacto en el plazo de 48hs de recibida la presente. Caso contrario, deberemos proseguir sumariamente con la ejecución fiscal ante la Justicia. Para otras consultas puede ingresar a InfoAgip o al CHAT ONLINE desde: www.agip.gob.ar. <br/>
  &nbsp;&nbsp;En caso de haber realizado la cancelación de la deuda reclamada al momento de recibir la presente, por favor desestime esta notificación.<br/>
  <b>&nbsp;&nbsp;&nbsp;Queda ud. debidamente notificado.</b></h5></h5>

  <div div><h5 align="center">
                      <div align="right"><img src='https://mandatario50.com.ar/imagenes_mail/firma_pie_mail.jpg'></div><br/>
</b></ul></h5></div><br/>
  <h3 align="center"><b>CUMPLIR NOS BENEFICIA TODOS</h3>
      </div></p>
    </cuerpo>
  </html>
  `;
  }
  setEditorContent(event) {
    // console.log(event, typeof event);
    
  }
  Enviar() {
    this.mailsService.cargarMail(this.content).subscribe((res: any) => {
    
    });
  }
}
