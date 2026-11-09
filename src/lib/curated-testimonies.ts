export interface CuratedTestimony {
  id: string;
  quote: string;
  vimeoUrl: string;
  user: { id: string; username: string };
}

// Vaste selectie van jong ogende getuigenissen voor de homepage en Over ons.
// Geen backend-API-aanroep: alleen de publieke Vimeo-thumbnails worden geladen.
export const CURATED_TESTIMONIES: CuratedTestimony[] = [
  { id: '397eaa37-e93c-95b8-cf62-3a222591ba69', quote: 'Ik weet dat ik bij Jezus mag zijn wie ik gewoon ben.', vimeoUrl: '1205452716', user: { id: '63a2af19-2a78-18e9-9ab9-3a22258ea879', username: 'Bickel' } },
  { id: '6c0114bf-82ab-f637-4f7d-3a221cb9110e', quote: 'Ik ben opgevoed met het islamitische geloof, toch trok Jezus mij naar Hem toe.', vimeoUrl: '1205136000', user: { id: '9a0bc0fa-021b-0684-c96e-3a221cb50b20', username: 'Nawal' } },
  { id: '05e0c4c9-3d6f-4526-0bfc-3a220d14b3c2', quote: 'Jezus staat altijd voor me klaar en is er gewoon.', vimeoUrl: '1204289580', user: { id: '80a69fc7-8dcd-637b-5e24-3a220d114908', username: 'Jelle' } },
  { id: '19a4e2d1-2f2b-2cd3-1d90-3a220cfcffcb', quote: 'Ik zie Jezus als mijn Provider.', vimeoUrl: '1204282360', user: { id: 'a75a8362-b6b4-80da-b955-3a220cf96cd1', username: 'Elijah' } },
  { id: '1a8035d7-e9f6-2593-6a59-3a21f3ba66f9', quote: 'Geloven werd een kracht voor mij.', vimeoUrl: '1202930370', user: { id: 'e69149d5-62f4-a41c-9aed-3a21f3b464a7', username: 'Daimy' } },
  { id: 'e4b25452-e333-7717-1066-3a21f3aef73b', quote: 'Ik zocht altijd naar bevestiging of ik wel goed genoeg was.', vimeoUrl: '1202927777', user: { id: '308880c6-9b2e-1b03-e885-3a21f3a9ea48', username: 'Lianne' } },
  { id: '5ca7d5b1-318d-4af1-9b9b-3a21a4a54f3f', quote: 'Ik volg gewoon Jezus', vimeoUrl: '1198391877', user: { id: '42571348-cf49-9647-6bf1-3a21a4a2ff97', username: 'Julian' } },
  { id: 'fe6431f7-6923-c577-e9e4-3a214e608cb8', quote: '“God is echt!”', vimeoUrl: '1193339697', user: { id: 'aa4cc05f-79fe-49f9-fcd4-3a214e3ee22a', username: 'Lydia' } },
  { id: 'fcfecaff-1ed0-75b9-a940-3a20e4b75883', quote: 'Mijn twijfel werd weggespoeld door Gods Liefde', vimeoUrl: '1187194889', user: { id: 'eab21043-1c8d-707f-3312-3a20e093e39d', username: 'Hanne' } },
  { id: 'ffed45d5-45c0-d586-9613-3a2018152088', quote: 'Ik riep om hulp toen ik het echt niet meer zag zitten.', vimeoUrl: '1175120400', user: { id: 'eb43a539-2d2d-9b20-86ae-3a20180f7c9a', username: 'Marleen' } },
  { id: 'b6b5ffcc-3dff-890f-d1ad-3a1ec5ed8c6c', quote: 'Jezus zette mijn leven op zijn kop', vimeoUrl: '1153711373', user: { id: 'd25fc548-e4a0-d4f1-4d6a-3a1ec4e853b1', username: 'Carlijn' } },
  { id: '9e4bd2c5-ea02-083d-5ad4-3a1eed39e138', quote: 'Van snakkend naar liefde naar volmaakte liefde', vimeoUrl: '1156442169', user: { id: '8e13e962-d03f-4aaa-a7d2-3a1eed25adec', username: 'Milou' } },
  { id: '46d2ad7a-df3f-8918-2a0e-3a1e0b1fd4eb', quote: 'Het maakt niet uit wie je bent, wat je hebt gedaan of waar je staat, Jezus wil je leren kennen precies waar je nu bent', vimeoUrl: '1144254694', user: { id: '3905b784-c9dd-59b2-8d6d-3a1e0b0ba579', username: 'Yannick' } },
  { id: '0095b523-f858-2c00-48da-3a1c1755ff12', quote: 'De ontdekkingsreis van het geloof🌎✝️', vimeoUrl: '1114853054', user: { id: '387c62bc-9b97-7c18-5e23-3a1bf7cef3c2', username: 'Youri' } },
  { id: '0595b57d-b5f0-495e-f9f0-3a1c080ac364', quote: 'Jezus is sterker dan de duivel!', vimeoUrl: '1114232845', user: { id: 'ca09a7a3-9a2c-5edb-650d-3a1c07f688de', username: 'Amélie' } },
  { id: '5d8e1538-998a-44eb-a6cc-3a1aa4cfc49d', quote: 'Ik dacht dat ik niks waard was, totdat ik Jezus leerde kennen', vimeoUrl: '1095244451', user: { id: '72af7461-ccdb-311b-2eb7-3a1aa4cb91c8', username: 'Sem' } },
];

