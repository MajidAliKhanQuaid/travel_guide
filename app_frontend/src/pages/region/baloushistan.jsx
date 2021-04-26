import { useEffect } from "react";
import { Col, Figure, Row } from "react-bootstrap";
import { AzureMap, AzureMapsProvider, AzureMapOptions } from "react-azure-maps";
import { AuthenticationType } from "azure-maps-control";

export const Balouchistan = () => {
 useEffect(() => {
    // const style = document.createElement("link");
    // style.href =
    //   "https://atlas.microsoft.com/sdk/javascript/mapcontrol/2/atlas.min.css";
    // style.rel = "stylesheet";
    // style.type = "text/css";
    // style.async = true;
    // document.body.appendChild(style);
    // /* <script src="https://atlas.microsoft.com/sdk/javascript/mapcontrol/2/atlas.min.js"></script> */
    // const script = document.createElement("link");
    // script.src =
    //   "https://atlas.microsoft.com/sdk/javascript/mapcontrol/2/atlas.min.js";
    // script.async = true;
    // script.onload = initMap();
    // document.body.appendChild(script);
  }, []);

  const option = {
    authOptions: {
      authType: AuthenticationType.subscriptionKey,
      subscriptionKey: "trIDs8-MScj-vHGnB9Yc4N0vnu8XLEd2DTe1wcH_brE", // Your subscription key
      showLogo: false,
    },
  };
  // initMap();
  return (
    <>
     {/* <AzureMapsProvider>
        <div style={{ height: "300px" }}>
          <AzureMap
            options={{
              authOptions: {
                authType: AuthenticationType.subscriptionKey,
                subscriptionKey: "trIDs8-MScj-vHGnB9Yc4N0vnu8XLEd2DTe1wcH_brE", // Your subscription key
                showLogo: false,
              },
            }}
            styleOptions={{
              showLogo: false,
              view: "PK",
              showFeedbackLink: false,
            }}
            cameraOptions={{ zoom: 3 }}
            trafficOptions={{ flow: "absolute" }}
            controls={{}}
          />
        </div>
      </AzureMapsProvider>
      <div id="myMap"></div>
      <h1>Balouchistan</h1>
      <p
        style={{
          wordWrap: "break-word",
          textAlign: "justify",
          textJustify: "inter-word",
        }}
      >
        Balochistan is one of the four provinces of Pakistan. It is the largest
        province in terms of land area, forming the southwestern region of the
        country, but is the least populated. Its provincial capital and largest
        city is Quetta. <br />
        Balochistan shares borders with Punjab and the Khyber Pakhtunkhwa to the
        northeast, Sindh to the east and southeast, the Arabian Sea to the
        south, Iran to the west and Afghanistan to the north and northwest.{" "}
        <br />
        The main ethnic groups in the province are the Baloch people and the
        Pashtuns, who constitute 52% and 36% of the population respectively. The
        remaining 12% comprises smaller communities of Brahuis, Hazaras along
        with other settlers such as Sindhis, Punjabis, Uzbeks and Turkmens. The
        name "Balochistan" means "the land of the Baloch". Largely
        underdeveloped, its provincial economy is dominated by natural
        resources, especially its natural gas fields, estimated to have
        sufficient capacity to supply Pakistan's demands over the medium to long
        term. Aside from Quetta, the second-largest city of the province is
        Turbat in the south, while another area of major economic importance is
        Gwadar Port on the Arabian Sea. Balochistan is noted for its unique
        culture and extremely dry desert climate.
      </p>
      <div className="bg-dark" style={{ position: "absolute", right: 0 }}>
        <img
          style={{ width: "250px" }}
          className="d-block"
          src={"/gwadar.jpg"}
          alt={"Gwadar Stadium"}
        />
      </div>*/}
      <h1 style={{ margin: "35px" }}>Balochistan</h1>

<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    width: "calc(100% - (2 * 35px))",
    height: "70vh",
    margin: "35px",
    padding: "35px",
    fontSize: "20px",
    textAlign: "justify",
    backgroundColor: "#fce354",
    borderRadius: "10px",
  }}
>
Balochistan( Balochi: بلوچِستان‎; also romanised as Baluchistan) is an arid desert and mountainous region in South and Western Asia. It comprises the Pakistani province of Balochistan, the Iranian province of Sistan and Baluchestan, and the southern areas of Afghanistan, including Nimruz, Helmand and Kandahar provinces.Balochistan borders the Pashtunistan region to the north, Sindh and Punjab to the east, and Persian regions to the west. South of its southern coastline, including the Makran Coast, are the Arabian Sea and the Gulf of Oman.
  <img
    style={{ margin: "10px", width: "30%" }}
    src="https://upload.wikimedia.org/wikipedia/commons/8/88/Quaid-e-Azam_Residancy_Ziarat_Balochistan_by_Balochlens.jpg"
  />
</div>
 
      <table class="databalouchistan" style={{textalign: 'center'}}>
<thead><tr>
<th class="headerSort" tabindex="0" role="columnheader button" title="Sort ascending">Rank
</th>
<th class="headerSort" tabindex="0" role="columnheader button" title="Sort ascending">City Name
</th>
<th class="headerSort" tabindex="0" role="columnheader button" title="Sort ascending"><a href="/wiki/Districts_of_Balochistan,_Pakistan" title="Districts of Balochistan, Pakistan">District</a>
</th>
<th class="headerSort" tabindex="0" role="columnheader button" title="Sort ascending"><a href="/wiki/Districts_of_Balochistan,_Pakistan#Divisions_of_Balochistan_and_their_districts" title="Districts of Balochistan, Pakistan">Division</a>
</th>
</tr>
</thead>
<tbody>
<tr>
<th style={{textalign:'center'}} style={{background:'  #87CEFA'}}><span style={{color:'white'}}><b>1</b></span>
</th>
<td><a href="https://en.wikipedia.org/wiki/Quetta" title="Quetta">Quetta</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Quetta_District" title="Quetta District">Quetta</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Quetta_Division" title="Quetta Division">Quetta</a>
</td>
 
 </tr>
<tr>
<th style={{textalign:'center'}}style={{ background:'  #87CEFA'}}><span style={{color:'white'}}><b>2</b></span>
</th>
<td><a href="https://en.wikipedia.org/wiki/Turbat" title="Turbat">Turbat</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Kech_District" title="Kech District">Kech</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Makran_Division" title="Makran Division">Makran</a>
</td>
  
 </tr>
<tr>
<th style={{textalign:'center'}}style={{ background:'  #87CEFA'}}><span style={{color:'white'}}><b>3</b></span>
</th>
<td><a href="https://en.wikipedia.org/wiki/Khuzdar" title="Khuzdar">Khuzdar</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Khuzdar_District" title="Khuzdar District">Khuzdar</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Kalat_Division" class="mw-redirect" title="Kalat Division">Qalat</a>
</td>

 </tr>
<tr>
<th style={{textalign:'center'}}style={{ background:'  #87CEFA'}}><span style={{color:'white'}}><b>4</b></span>
</th>
<td><a href="https://en.wikipedia.org/wiki/Hub,_Balochistan" title="Hub, Balochistan">Hub</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Lasbela_District" title="Lasbela District">Lasbela</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Kalat_Division" class="mw-redirect" title="Kalat Division">Qalat</a>
</td>
 
 </tr>
<tr>
<th style={{textalign:'center'}} style={{ background:'  #87CEFA'}}><span style={{color:'white'}}><b>5</b></span>
</th>
<td><a href="https://en.wikipedia.org/wiki/Chaman" title="Chaman">Chaman</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Killa_Abdullah_District" title="Killa Abdullah District">Qilla Abdullah</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Quetta_Division" title="Quetta Division">Quetta</a>
</td>
 
 </tr>
<tr>
<th style={{textalign:'center'}}style={{background:'  #87CEFA'}}><span style={{color:'white'}}><b>6</b></span>
</th>
<td><a href="https://en.wikipedia.org/wiki/Dera_Murad_Jamali" title="Dera Murad Jamali">Dera Murad Jamali</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Nasirabad_District" title="Nasirabad District">Nasirabad</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Nasirabad_Division" title="Nasirabad Division">Nasirabad</a>
</td>
 
 </tr>
<tr>
<th style={{textalign:'center'}}style={{ background:'  #87CEFA'}}><span style={{color:'white'}}><b>7</b></span>
</th>
<td><a href="https://en.wikipedia.org/wiki/Gwadar" title="Gwadar">Gwadar</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Gwadar_District" title="Gwadar District">Gwadar</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Makran_Division" title="Makran Division">Makran</a>
</td>
 
 </tr>
<tr>
<th style={{textalign:'center'}}style={{ background:'  #87CEFA'}}><span style={{color:'white'}}><b>8</b></span>
</th>
<td><a href="https://en.wikipedia.org/wiki/Dera_Allah_Yar" title="Dera Allah Yar">Dera Allah Yar</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Jaffarabad_District" class="mw-redirect" title="Jaffarabad District">Jaffarabad</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Nasirabad_Division" title="Nasirabad Division">Nasirabad</a>
</td>
 
 </tr>
<tr>
<th style={{textalign:'center'}} style={{ background:'  #87CEFA'}}><span style={{color:'white'}}><b>9</b></span>
</th>
<td><a href="https://en.wikipedia.org/wiki/Usta_Mohammad" title="Usta Mohammad">Usta Mohammad</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Jaffarabad_District" class="mw-redirect" title="Jaffarabad District">Jaffarabad</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Nasirabad_Division" title="Nasirabad Division">Nasirabad</a>
</td>
 
 </tr>
<tr>
<th style={{textalign:'center'}} style={{background:'  #87CEFA'}}><span style={{color:'white'}}><b>10</b></span>
</th>
<td><a href="https://en.wikipedia.org/wiki/Sui,_Balochistan" title="Sui, Balochistan">Sui Town</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Dera_Bugti_District" title="Dera Bugti District">Dera Bugti</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Sibi_Division" title="Sibi Division">Sibi</a>
</td>
 
 </tr>
<tr>
<th style={{textalign:'center'}}style={{ background:'  #87CEFA'}}><span style={{color:'white'}}><b>11</b></span>
</th>
<td><a href="https://en.wikipedia.org/wiki/Sibi" title="Sibi">Sibi</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Sibi_District" title="Sibi District">Sibi</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Sibi_Division" title="Sibi Division">Sibi</a>
</td>
 
 </tr>
<tr>
<th style={{textalign:'center'}}style={{background:'  #87CEFA'}}><span style={{color:'white'}}><b>12</b></span>
</th>
<td><a href="https://en.wikipedia.org/wiki/Loralai" title="Loralai">Loralai</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Loralai_District" title="Loralai District">Loralai</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Zhob_Division" title="Zhob Division">Zhob</a>
</td>
 
 </tr>
<tr>
<th style={{textalign:'center'}}style={{ background:'  #87CEFA'}}><span style={{color:'white'}}><b>13</b></span>
</th>
<td>Tump
</td>
<td><a href="https://en.wikipedia.org/wiki/Kech_District" title="Kech District">Kech</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Makran_Division" title="Makran Division">Makran</a>
</td>
 
 </tr>
<tr>
<th style={{textalign:'center'}}style={{background:'  #87CEFA'}}><span style={{color:'white'}}><b>14</b></span>
</th>
<td><a href="https://en.wikipedia.org/wiki/Nushki" title="Nushki">Nushki</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Nushki_District" title="Nushki District">Nushki</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Rakhshan_Division" title="Rakhshan Division">Rakhshan</a>
</td>
 
 </tr>
<tr>
<th style={{textalign:'center'}}style={{background:'  #87CEFA'}}><span style={{color:'white'}}><b>15</b></span>
</th>
<td><a href="https://en.wikipedia.org/wiki/Zhob" title="Zhob">Zhob</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Zhob_District" title="Zhob District">Zhob</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Zhob_Division" title="Zhob Division">Zhob</a>
</td>
 
 </tr>
<tr>
<th style={{textalign:'center'}}style={{ background:'  #87CEFA'}}><span style={{color:'white'}}><b>16</b></span>
</th>
<td><a href="https://en.wikipedia.org/wiki/Kharan,_Pakistan" title="Kharan, Pakistan">Kharan</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Kharan_District" title="Kharan District">Kharan</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Rakhshan_Division" title="Rakhshan Division">Rakhshan</a>
</td>
 
  </tr>
<tr>
<th style={{textalign:'center'}}style={{ background:'  #87CEFA'}}><span style={{color:'white'}}><b>17</b></span>
</th>
<td>Chitkan
</td>
<td><a href="https://en.wikipedia.org/wiki/Panjgur_District" title="Panjgur District">Panjgur</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Makran_Division" title="Makran Division">Makran</a>
</td>
 
 </tr>
<tr>
<th style={{textalign:'center'}}style={{background:'  #87CEFA'}}><span style={{color:'white'}}><b>18</b></span>
</th>
<td><a href="https://en.wikipedia.org/wiki/Khanozai" title="Khanozai">Khanozai</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Pishin_District" title="Pishin District">Pishin</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Quetta_Division" title="Quetta Division">Quetta</a>
</td>
 
 </tr>
<tr>
<th style={{textalign:'center'}} style={{background:'  #87CEFA'}}><span style={{color:'white'}}><b>19</b></span>
</th>
<td><a href="https://en.wikipedia.org/wiki/Buleda" title="Buleda">Buleda</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Kech_District" title="Kech District">Kech</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Makran_Division" title="Makran Division">Makran</a>
</td>
 
 </tr>
<tr>
<th style={{textalign:'center'}}style={{ background:'  #87CEFA'}}><span style={{color:'white'}}><b>20</b></span>
</th>
<td>Saranan
</td>
<td><a href="https://en.wikipedia.org/wiki/Pishin_District" title="Pishin District">Pishin</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Quetta_Division" title="Quetta Division">Quetta</a>
</td>
 
 </tr>
<tr>
<th style={{textalign:'center'}} style={{background:'  #87CEFA'}}><span style={{color:'white'}}><b>21</b></span>
</th>
<td>Zehri
</td>
<td><a href="https://en.wikipedia.org/wiki/Khuzdar_District" title="Khuzdar District">Khuzdar</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Kalat_Division" class="mw-redirect" title="Kalat Division">Qalat</a>
</td>
 
 </tr>
<tr>
<th style={{textalign:'center'}}style={{background:'  #87CEFA'}}><span style={{color:'white'}}><b>22</b></span>
</th>
<td><a href="https://en.wikipedia.org/wiki/Kalat,_Pakistan" title="Kalat, Pakistan">Qalat</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Kalat_District" title="Kalat District">Qalat</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Kalat_Division" class="mw-redirect" title="Kalat Division">Qalat</a>
</td>
 
 </tr>
<tr>
<th style={{textalign:'center'}} style={{background:'  #87CEFA'}}><span style={{color:'white'}}><b>23</b></span>
</th>
<td>Tasp
</td>
<td><a href="https://en.wikipedia.org/wiki/Panjgur_District" title="Panjgur District">Panjgur</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Makran_Division" title="Makran Division">Makran</a>
</td>
  </tr>
<tr>
<th style={{textalign:'center'}}style={{ background:'  #87CEFA'}}><span style={{color:'white'}}><b>24</b></span>
</th>
<td><a href="https://en.wikipedia.org/wiki/Surab,_Pakistan" title="Surab, Pakistan">Surab</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Shaheed_Sikandarabad_District" title="Shaheed Sikandarabad District">Shaheed Sikandarabad</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Kalat_Division" class="mw-redirect" title="Kalat Division">Qalat</a>
</td>
 
 </tr>
<tr>
<th style={{textalign:'center'}}style={{ background:'  #87CEFA'}}><span style={{color:'white'}}><b>25</b></span>
</th>
<td><a href="https://en.wikipedia.org/wiki/Pishin,_Pakistan" title="Pishin, Pakistan">Pishin</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Pishin_District" title="Pishin District">Pishin</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Quetta_Division" title="Quetta Division">Quetta</a>
</td>
 
 </tr>
<tr>
<th style={{textalign:'center'}} style={{background:'  #87CEFA'}}><span style={{color:'white'}}><b>26</b></span>
</th>
<td><a href="https://en.wikipedia.org/wiki/Mastung,_Pakistan" title="Mastung, Pakistan">Mastung</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Mastung_District" title="Mastung District">Sibi</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Kalat_Division" class="mw-redirect" title="Kalat Division">Qalat</a>
</td>
 
 </tr>
<tr>
<th style={{textalign:'center'}}style={{ background:'  #87CEFA'}}><span style={{color:'white'}}><b>27</b></span>
</th>
<td><a href="https://en.wikipedia.org/wiki/Killa_Saifullah" title="Killa Saifullah">Qilla Saifullah</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Killa_Saifullah_District" title="Killa Saifullah District">Qilla Saifullah</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Zhob_Division" title="Zhob Division">Zhob</a>
</td>
 
 </tr>
<tr>
<th style={{textalign:'center'}}style={{background:'  #87CEFA'}}><span style={{color:'white'}}><b>28</b></span>
</th>
<td><a href="https://en.wikipedia.org/wiki/Pasni_(city)" title="Pasni (city)">Pasni</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Gwadar_District" title="Gwadar District">Gwadar</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Makran_Division" title="Makran Division">Makran</a>
</td>
 
 </tr>
<tr>
<th style={{textalign:'center'}} style={{ background:'  #87CEFA'}}><span style={{color:'white'}}><b>29</b></span>
</th>
<td><a href="https://en.wikipedia.org/wiki/Nall,_Pakistan" title="Nall, Pakistan">Nal</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Khuzdar_District" title="Khuzdar District">Khuzdar</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Kalat_Division" class="mw-redirect" title="Kalat Division">Qalat</a>
</td>
 
 </tr>
<tr>
<th style={{textalign:'center'}} style={{background:'  #87CEFA'}}><span style={{color:'white'}}><b>30</b></span>
</th>
<td>Winder
</td>
<td><a href="https://en.wikipedia.org/wiki/Lasbela_District" title="Lasbela District">Lasbela</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Kalat_Division" class="mw-redirect" title="Kalat Division">Qalat</a>
</td>
 
 </tr>
<tr>
<th style={{textalign:'center'}} style={{background:'  #87CEFA'}}><span style={{color:'white'}}><b>31</b></span>
</th>
<td><a href="https://en.wikipedia.org/wiki/Uthal" title="Uthal">Uthal</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Lasbela_District" title="Lasbela District">Lasbela</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Kalat_Division" class="mw-redirect" title="Kalat Division">Qalat</a>
</td>
 
 </tr>
<tr>
<th style={{textalign:'center'}}style={{ background:'  #87CEFA'}}><span style={{color:'white'}}
><b>32</b></span>
</th>
<td><a href="https://en.wikipedia.org/wiki/Huramzai" title="Huramzai">Huramzai</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Pishin_District" title="Pishin District">Pishin</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Quetta_Division" title="Quetta Division">Quetta</a>
</td>
 
 </tr>
<tr>
<th style={{textalign:'center'}} style={{background:'  #87CEFA'}}><span style={{color:'white'}}><b>33</b></span>
</th>
<td><a href="https://en.wikipedia.org/wiki/Muslim_Bagh" title="Muslim Bagh">Muslim Bagh</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Killa_Saifullah_District" title="Killa Saifullah District">Qilla Saifullah</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Zhob_Division" title="Zhob Division">Zhob</a>
</td>
 
 </tr>
<tr>
<th style={{textalign:'center'}} style={{background:'  #87CEFA'}}><span style={{color:'white'}}><b>34</b></span>
</th>
<td>Dera Bugti
</td>
<td><a href="https://en.wikipedia.org/wiki/Dera_Bugti_District" title="Dera Bugti District">Dera Bugti</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Sibi_Division" title="Sibi Division">Sibi</a>
</td>
 
 </tr>
<tr>
<th style={{textalign:'center'}}style={{ background:'  #87CEFA'}}><span style={{color:'white'}}><b>35</b></span>
</th>
<td>Qilla Abdullah
</td>
<td><a href="https://en.wikipedia.org/wiki/Killa_Abdullah_District" title="Killa Abdullah District">Qilla Abdullah</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Quetta_Division" title="Quetta Division">Quetta</a>
</td>
 
 </tr>
<tr>
<th style={{textalign:'center'}} style={{background:'  #87CEFA'}}><span style={{color:'white'}}><b>36</b></span>
</th>
<td><a href="https://en.wikipedia.org/wiki/Bela,_Pakistan" title="Bela, Pakistan">Bela</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Lasbela_District" title="Lasbela District">Lasbela</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Kalat_Division" class="mw-redirect" title="Kalat Division">Qalat</a>
</td>
 
 </tr>
<tr>
<th style={{textalign:'center'}} style={{background:'  #87CEFA'}}><span style={{color:'white'}}><b>37</b></span>
</th>
<td><a href="https://en.wikipedia.org/wiki/Wadh" title="Wadh">Wadh</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Khuzdar_District" title="Khuzdar District">Khuzdar</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Kalat_Division" class="mw-redirect" title="Kalat Division">Qalat</a>
</td>
 
 </tr>
<tr>
<th style={{textalign:'center'}}style={{background:'  #87CEFA'}}><span style={{color:'white'}}><b>38</b></span>
</th>
<td><a href="https://en.wikipedia.org/wiki/Washuk" title="Washuk">Washuk</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Washuk_District" title="Washuk District">Washuk</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Rakhshan_Division" title="Rakhshan Division">Rakhshan</a>
</td>

 </tr>
<tr>
<th style={{textalign:'center'}} style={{background:'  #87CEFA'}}><span style={{color:'white'}}><b>39</b></span>
</th>
<td><a href="https://en.wikipedia.org/wiki/Awaran" title="Awaran">Awaran</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Awaran_District" title="Awaran District">Awaran</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Kalat_Division" class="mw-redirect" title="Kalat Division">Qalat</a>
</td>
 
 </tr>
<tr>
<th style={{textalign:'center'}} style={{background:'  #87CEFA'}}><span style={{color:'white'}}><b>40</b></span>
</th>
<td><a href="https://en.wikipedia.org/wiki/Machh" title="Machh">Machh</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Kachhi_District" title="Kachhi District">Kachhi</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Nasirabad_Division" title="Nasirabad Division">Nasirabad</a>
</td>
 
 </tr>
<tr>
<th style={{textalign:'center'}}style={{ background:'  #87CEFA'}}><span style={{color:'white'}}><b>41</b></span>
</th>
<td><a href="https://en.wikipedia.org/wiki/Jiwani" title="Jiwani">Jiwani</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Gwadar_District" title="Gwadar District">Gwadar</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Makran_Division" title="Makran Division">Makran</a>
</td>
 
 </tr>
<tr>
<th style={{textalign:'center'}}style={{background:'  #87CEFA'}}><span style={{color:'white'}}><b>42</b></span>
</th>
<td><a href="https://en.wikipedia.org/wiki/Ormara" title="Ormara">Ormara</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Gwadar_District" title="Gwadar District">Gwadar</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Makran_Division" title="Makran Division">Makran</a>
</td>
 
 </tr>
<tr>
<th style={{textalign:'center'}}style={{ background:'  #87CEFA'}}><span style={{color:'white'}}><b>43</b></span>
</th>
<td><a href="https://en.wikipedia.org/wiki/Kohlu" title="Kohlu">Kohlu</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Kohlu_District" title="Kohlu District">Kohlu</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Sibi_Division" title="Sibi Division">Sibi</a>
</td>
 
 </tr>
<tr>
<th style={{textalign:'center'}}style={{background:'  #87CEFA'}}><span style={{color:'white'}}><b>44</b></span>
</th>
<td><a href="https://en.wikipedia.org/wiki/Bhag" title="Bhag">Bhag</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Sibi_District" title="Sibi District">Sibi</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Sibi_Division" title="Sibi Division">Sibi</a>
</td>
 
 </tr>
<tr>
<th style={{textalign:'center'}}style= {{ background:'  #87CEFA'}}><span style={{color:'white'}}><b>45</b></span>
</th>
<td><a href="https://en.wikipedia.org/wiki/Dalbandin" title="Dalbandin">Dalbandin</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Chagai_District" title="Chagai District">Chagai</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Rakhshan_Division" title="Rakhshan Division">Rakhshan</a>
</td>
 
 </tr>
<tr>
<th style={{textalign:'center'}}style= {{background:'  #87CEFA'}}><span style={{color:'white'}}><b>46</b></span>
</th>
<td><a href="https://en.wikipedia.org/wiki/Dhadar" title="Dhadar">Dhadar</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Kachhi_District" title="Kachhi District">Kachhi</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Nasirabad_Division" title="Nasirabad Division">Nasirabad</a>
</td>
 
 </tr>
<tr>
<th style={{textalign:'center'}}style={{ background:'  #87CEFA'}}><span style={{color:'white'}}><b>47</b></span>
</th>
<td>Musakhel
</td>
<td><a href="https://en.wikipedia.org/wiki/Musakhel_District,_Pakistan" title="Musakhel District, Pakistan">Musakhel</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Zhob_Division" title="Zhob Division">Zhob</a>
</td>
 
 </tr>
<tr>
<th style={{textalign:'center'}} style={{background:'  #87CEFA'}}><span style={{color:'white'}}><b>48</b></span>
</th>
<td><a href="https://en.wikipedia.org/wiki/Harnai" title="Harnai">Harnai</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Harnai_District" title="Harnai District">Harnai</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Sibi_Division" title="Sibi Division">Sibi</a>
</td>
 
 </tr>
<tr>
<th style={{textalign:'center'}} style={{background:'  #87CEFA'}}><span style={{color:'white'}}><b>49</b></span>
</th>
<td><a href="https://en.wikipedia.org/wiki/Dureji" title="Dureji">Dureji</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Lasbela_District" title="Lasbela District">Lasbela</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Kalat_Division" class="mw-redirect" title="Kalat Division">Qalat</a>
</td>
 
 </tr>
<tr>
<th style={{textalign:'center'}}style= {{background:'  #87CEFA'}}><span style={{color:'white'}}><b>50</b></span>
</th>
<td><a href="https://en.wikipedia.org/wiki/Sohbatpur" title="Sohbatpur">Sohbatpur</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Sohbatpur_District" title="Sohbatpur District">Sohbatpur</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Nasirabad_Division" title="Nasirabad Division">Nasirabad</a>
</td>
 
 </tr>
<tr>
<th style={{textalign:'center'}} style={{background:'  #87CEFA'}}><span style={{color:'white'}}><b>51</b></span>
</th>
<td>Gajjar Mashkay
</td>
<td><a href="https://en.wikipedia.org/wiki/Awaran_District" title="Awaran District">Awaran</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Kalat_Division" class="mw-redirect" title="Kalat Division">Qalat</a>
</td>
 
 </tr>
<tr>
<th style={{textalign:'center'}}style= {{background:'  #87CEFA'}}><span style ={{color:'white'}}><b>52</b></span>
</th>
<td><a href="https://en.wikipedia.org/wiki/Barkhan" title="Barkhan">Barkhan</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Barkhan_District" title="Barkhan District">Barkhan</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Zhob_Division" title="Zhob Division">Zhob</a>
</td>
 
 </tr>
<tr>
<th style={{textalign:'center'}}style={{ background:'  #87CEFA'}}><span style={{color:'white'}}><b>53</b></span>
</th>
<td>Shahrug
</td>
<td><a href="https://en.wikipedia.org/wiki/Harnai_District" title="Harnai District">Harnai</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Sibi_Division" title="Sibi Division">Sibi</a>
</td>
 
 </tr>
<tr>
<th style={{textalign:'center'}} style= {{background:'  #87CEFA'}}><span style={{color:'white'}}><b>54</b></span>
</th>
<td><a href="https://en.wikipedia.org/wiki/Duki" title="Duki">Duki</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Duki_District" title="Duki District">Duki</a>
</td>
<td><a href="https://en.wikipedia.org/wiki/Zhob_Division" title="Zhob Division">Zhob</a>
</td>
 
 </tr>
</tbody><tfoot></tfoot>
</table>


    </>
  );
};
