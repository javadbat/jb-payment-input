import { BankInfo } from "./types";
import AyandehLogo from './logo/Ayandeh.svg';
import DayLogo from './logo/Day.svg';
import EghtesadNovinLogo from './logo/EghtesadNovin.svg';
import GardeshgariLogo from './logo/Gardeshgari.svg';
import IranzaminLogo from './logo/IranZamin.svg';
import KarafarinLogo from './logo/Karafarin.svg';
import keshavarziLogo from './logo/Keshavarzi.svg';
import MaskanLogo from './logo/Maskan.svg';
import MehrLogo from './logo/MehrIran.svg';
import MellatLogo from './logo/Mellat.svg';
import MelliLogo from './logo/Melli.svg';
import ParsianLogo from './logo/Parsian.svg';
import PasargadLogo from './logo/Pasargad.svg';
import PostBankLogo from './logo/Post.svg';
import RefahLogo from './logo/Refah.svg';
import SaderatLogo from './logo/Saderat.svg';
import SamanLogo from './logo/Saman.svg';
import SanatvamadanLogo from './logo/SanatMadan.svg';
import SarmayehLogo from './logo/Sarmayeh.svg';
import SepahLogo from './logo/Sepah.svg';
import ShahrLogo from './logo/Shahr.svg';
import SinaLogo from './logo/Sina.svg';
import TejaratLogo from './logo/Tejarat.svg';
import ToseeTaavonLogo from './logo/ToseeTaavon.svg';
import ToseeSaderatLogo from './logo/ToseeSaderat.svg';
import KhavarmianehBankLogo from './logo/KhavarMianeh.svg';
import BlueBankLogo from './logo/BluBank.svg';
import ResalatBankLogo from './logo/Resalat.svg';
import MelalBankLogo from './logo/Melall.svg';
import MarkaziLogo from './logo/markazi.svg';
//use dynamic import when you really want a lazy load logo later after good support
// const logoImport = async function(name){
//     return await import(`./logo/${name}.svg`);
// };
//TODO: add imported logo 
export const allBankInfo:BankInfo = [
    { title: { fa: 'بانک سپه', en: 'Sepah Bank' }, prefix: ['589210', '636949', '505801','627381','639599','505801','639370'], logo: SepahLogo, color: '#E8651D', primary: '#CE6C36' },
    { title: { fa: 'بانک ملی ایران', en: 'Iran melli bank' }, prefix: ['603799'], logo: MelliLogo, color: '#F7A70B', primary: '#D99D28' },
    { title: { fa: 'بانک پارسیان', en: 'Parsian Bank' }, prefix: ['639194', '622106', '627884'], logo: ParsianLogo, color: '#981210', primary: '#922D2C' },
    { title: { fa: 'بانک پاسارگاد', en: 'Pasargad Bank' }, prefix: ['639347', '502229'], logo: PasargadLogo, color: '#F0C239', primary: '#C6A953' },
    { title: { fa: 'پست بانک ایران', en: 'Post Bank' }, prefix: ['627760'], logo: PostBankLogo, color: '#008840', primary: '#308558' },
    { title: { fa: 'بانک رفاه کارگران', en: 'Refah Bank' }, prefix: ['589463'], logo: RefahLogo, color: '#004B7F', primary: '#305F7F' },
    { title: { fa: 'بانک صادرات ایران', en: 'Saderat Bank' }, prefix: ['603769'], logo: SaderatLogo, color: '#29166F', primary: '#493E75' },
    { title: { fa: 'بانک سامان', en: 'Saman Bank' }, prefix: ['621986'], logo: SamanLogo, color: '#006FB8', primary: '#3075A3' },
    { title: { fa: 'بانک صنعت و معدن', en: 'Bank of Industry and Mine' }, prefix: ['627961'], logo: SanatvamadanLogo, color: '#A88B53', primary: '#9E885E' },
    { title: { fa: 'بانک سرمایه', en: 'Sarmayeh Bank' }, prefix: ['639607'], logo: SarmayehLogo, color: '#214B6A', primary: '#39586F' },
    { title: { fa: 'بانک شهر', en: 'Shahr Bank' }, prefix: ['502806', '504706'], logo: ShahrLogo, color: '#DF343A', primary: '#C7474B' },
    { title: { fa: 'بانک سینا', en: 'Sina Bank' }, prefix: ['639346'], logo: SinaLogo, color: '#19499E', primary: '#335796' },
    { title: { fa: 'بانک تجارت', en: 'Tejarat Bank' }, prefix: ['585983', '627353'], logo: TejaratLogo, color: '#2E428D', primary: '#4D5988' },
    { title: { fa: 'بانک توسعه تعاون', en: "Tose'e Ta'avon Bank" }, prefix: ['502908'], logo: ToseeTaavonLogo, color: '#0a8999', primary: '#278793' },
    { title: { fa: 'بانک توسعه صادرات ایران', en: 'Export Development Bank' }, prefix: ['627648', '207177'], logo: ToseeSaderatLogo, color: '#046B10', primary: '#23702C' },
    { title: { fa: 'بانک خاورمیانه', en: 'Middle East Bank' }, prefix: ['505809'], logo: KhavarmianehBankLogo, color: '#046B10', primary: '#23702C' },
    { title: { fa: 'بلو بانک', en: 'Blue Bank' }, prefix: ['621986'], logo: BlueBankLogo, color: '#046B10', primary: '#23702C' },
    { title: { fa: 'بانک قرض الحسنه رسالت', en: 'Gharzolhasaneh Resalat Bank' }, prefix: ['504172'], logo: ResalatBankLogo, color: '#046B10', primary: '#23702C' },
    { title: { fa: 'بانک ملل', en: 'Melal Bank' }, prefix: ['606256'], logo: MelalBankLogo, color: '#046B10', primary: '#23702C' },
    { title: { fa: 'بانک آینده', en: 'Ayande Bank' }, prefix: ['636214'], logo: AyandehLogo, color: '#522D1D', primary: '#634C42' },
    { title: { fa: 'بانک مرکزی', en: 'Markazi Bank' }, prefix: ['636949'], logo: MarkaziLogo, color: '#2E8DE0', primary: '#30699A' },
    { title: { fa: 'بانک دی', en: 'Day Bank' }, prefix: ['502938'], logo: DayLogo, color: '#008A9F', primary: '#308693' },
    { title: { fa: 'بانک اقتصاد نوین', en: 'Eghtesad Novin Bank' }, prefix: ['627412'], logo: EghtesadNovinLogo, color: '#701E72', primary: '#764377' },
    { title: { fa: 'بانک گردشگری', en: 'Tourism Bank' }, prefix: ['505416'], logo: GardeshgariLogo, color: '#B01117', primary: '#9E3A3E' },
    { title: { fa: 'بانک ایران زمین', en: 'Iran Zamin Bank' }, prefix: ['505785'], logo: IranzaminLogo, color: '#5613A2', primary: '#663C95' },
    { title: { fa: 'بانک کارآفرین', en: 'Karafarin Bank' }, prefix: ['627488', '502910'], logo: KarafarinLogo, color: '#157215', primary: '#3D773D' },
    { title: { fa: 'بانک کشاورزی', en: 'Keshavarzi Bank' }, prefix: ['603770', '639217'], logo: keshavarziLogo, color: '#B6762A', primary: '#f1ef9a' },
    { title: { fa: 'بانک مسکن', en: 'Maskan Bank' }, prefix: ['628023'], logo: MaskanLogo, color: '#F25920', primary: '#D56338' },
    { title: { fa: 'بانک  مهر ایران', en: 'Qarzol-Hasaneh Mehr Iran Bank' }, prefix: ['606373'], logo: MehrLogo, color: '#289925', primary: '#498F47' },
    { title: { fa: 'بانک ملت', en: 'Mellat Bank' }, prefix: ['610433', '991975'], logo: MellatLogo, color: '#D8062D', primary: '#C22442' },
];