import { EventEmitter, Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  selectedProduct = new EventEmitter<Product>();

  private products: Array<Product> = [
    new Product(
      '/assets/landing-massage.png',
      'Svédmasszázs',
      30,
      5000,
      'A svéd masszázs kézzel végzett, az emberi szervezetet mechanikai ingerek által befolyásoló kezelési technika. Egyes keleti masszázsoktól eltérően közvetlen fiziológiai hatásokra épít, ám a személyes törődés érzete a lelki egészségnek is jót tesz. A masszázst ruhátlan testfelületen, vivőanyaggal (krém) vagy anélkül végzik. Az éppen nem kezelt testrészeket betakarják. A vendég jellemzően masszázságyon fekszik vagy masszázsszéken ül. Lehet masszírozni közönséges ágyon és földön is, ám ez a masszőr számára jobban megterhelő.',
      'Az izmok gyorsabb fejlődése és regenerálódása, ami szavatolja a "felhőtlen életet.',
      60,
      90,
      8000,
      11000,

    ),
    new Product(
      '/assets/landing-hammam.png',
      'Hammam masszázs',
      30,
      5000,
      'Az aromaterápia különböző, többnyire növényi eredetű illóolajat használó terápia. Ezek az illóolajok nyugtató hatásúak, esetleg neurológiai stimulánsok. Pl. Az ausztrál teafa (Melaleuca alternifolia) illóolaja egyben az egyik leghatékonyabb légfertőtlenítő is. Kiegészítő gyógymódként, vagy ami vitatottabb, alternatív gyógymódként alkalmazzák. Nem ismert meggyőző bizonyíték arra nézve, hogy az aromaterápia alkalmas lenne bármilyen betegség megelőzésére vagy gyógyítására, de a beteg általános közérzetének javítására képes lehet.',
      'Nagy mértékben támogatja a sikeres relaxációt.',
      60,
      90,
      8000,
      11000,

    ),
    new Product(
      '/assets/landing-aroma.png',
      'Aromaterápiás masszázs',
      30,
      5000,
      'A hammam ( arab : حمام, romanizált : Hammam, török : hamam ) egy olyan típusú gőzfürdővel vagy egy hely a nyilvános fürdő kapcsolódó iszlám világ . Ez a muszlim világ kultúrájának kiemelkedő jellemzője, és a római termák mintájából örökölt . A muszlim fürdők vagy hammamok történelmileg megtalálhatók a Közel-Keleten, Észak-Afrikában, al-Andalúzban (iszlám Spanyolország és Portugália ), Közép-Ázsiában, az indiai szubkontinensen és Délkelet-Európában az oszmán uralom alatt . A muzulmán fürdő, a viktoriánus török ​​fürdő egyik variációja népszerű lett terápiaként, tisztítási módszerként és pihenési helyként a viktoriánus korszakban, gyorsan elterjedt a Brit Birodalomban, az Amerikai Egyesült Államokban és Nyugat -Európában .',
      'Szalonunkban ezt allergénmentes olíva szappannal helyettesítjük ami a legérzékenyebb bőrű vendégeknek is hipoallergén kezelést biztosít',
      60,
      90,
      8000,
      11000,

    ),
    new Product(
      '/assets/honey-massage.png',
      'Mézes masszázs',
      60,
      9000,
      'Mézet ősidők óta alkalmaznak a gyógyászatban a propolisz magas vitamin, enzim és ásványi anyag tartalma miatt. És most már masszázshoz is használjuk. Serkenti a kezelt testrészt, fokozza a vérkeringését és ezáltal a sejtek anyagcsere-folyamatait is, javítja. Tisztítja, méregteleníti az egész testet. A mézes masszázs terápia hatásaiként tapasztalható a test általános állapotjavulása, teljesítmény növekedése és az immunrendszer erősödése lévén a szervezet ellenálló képessége is jelentősen javul. A mézes masszázs természetesen ápolja, védi, frissíti a bőrt, mindemellett népszerűségét köszönheti még az izomlazító, fájdalomcsillapító, salaktalanító képességének is.  Hatékonyan alkalmazható gerincbántalmak, nyak-, váll- és hátfájdalmak, reumatikus panaszok, ízületi problémák, fájdalmak esetén. A mézben rejlő jótékony anyagok hatására a bőr megfiatalodik, puhává, simává, feszessé válik és egészségessé teszi a kezelt bőrfelületet. Megerősíti a testkontúrokat, javítja rugalmasságát',
      'Nagyon hatékony a bőr megújításában és méregtelenítésében ezáltal a narancsbőr kezelésére is megfelelő opció lehet.'

    ),
    new Product(
      '/assets/cellulit-massage.png',
      'Cellulit masszázs',
      60,
      10000,
      ' Azokon a testrészeken, ahol cellulit található, rossz a bőrszövet vér- és nyirokkeringése, ezért lassabb az anyagcseréje. A cellulites bőr ezért általában tapintásra is hidegebb. Kezelésében tehát az első és legfontosabb feladat a vér- és nyirokkeringés fokozása. A keringés fokozása nem csak az adott területen fontos, hanem az egész szervezet nyirokkeringésének serkentése a cél, mivel sokunknál már ez általános egészségügyi problémát jelent az ülő- vagy állómunka miatt.',
      'A bőr méregtelenítése, keringésének fokozása és feszesítése.'
    ),new Product(
      '/assets/strech.png',
      'Nyújtás',
      0,
      0,
      ' Minden izmod akkor végez munkát, amikor összehúzódik. Ez az összehúzódás az, ami ízületi elmozdulást hoz létre, és lehetővé teszi, hogy mozogj.      Az izomműködésed akkor tekinthető eszményinek, ha nem egy kórosan megrövidült, hanem a megfelelő, fiziológiás hosszban kezdődik az összehúzódás. Máskülönben a megrövidült izomban csak rövid elmozdulás jön létre, így kisebb lesz a lépésed, és minden más mozgástartományod beszűkül.  A beszűkült mozgástartományban való mozgás pedig látványosan öregnek mutatja a mozdulataidat.',
      'Könnyedén hátranyúlhatsz a kocsi hátsó ülésére a kabátért. ;) '
    ),new Product(
      '/assets/VPK.png',
      'Vezetett passzív kimozgatás',
      0,
      0,
      'Célja: a mozgás(ok) terjedelmének megtartása, illetve helyreállítása, a kontraktúrák (mozgásbeszűkülés) megelőzése , oldása, az izom-, ín-, reflex apparátus karbantartása, a bőr vérellátásának javítása, az aktív mozgások előkészítése, az izomzat hipertónusának csökkentése. Ezt a gyógymasszőr kezelést bizonyos mozgásszervi problémáknál szoktam javasolni, de kérhető is, ha valaki úgy érzi, hogy szüksége van rá (az ár tartalmazza). A masszázs kezelés végén szoktam alkalmazni az ízületi kimozgatást, mivel fontos, hogy a test, de legfőképpen a kezelendő terület jól be legyen melegedve, jól át legyen mozgatva.',
      'Hatékonyabb és gyorsabb rehabilitáció.'
    )
  ]

  constructor() { }

  getProducts(){
    return this.products.slice();
  }

  getProduct(index: number){
    return this.products[index];
  }

}
