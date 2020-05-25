var SITE = "";
const IS_DEV = false;
const HOST = IS_DEV
  ? "http://127.0.0.1:8360"
  : "https://apis-test.kupangzi.com";
const GET_COUPONS_API = HOST + "/coupon/getAll";
const UPDATE_TIMES_API = HOST + "/coupon/updateTimes";
const DELETE_PUBLIC_API = HOST + "/coupon/deletePublic";

const COUPON_STATUS = {
  ACTIVE: 0, // 正常
  USED: 10, // 已使用
  EXPIRED: 20, // 已过期
  DELETED: -10 // 已删除
};

const COUPON_TYPE = {
  PUBLIC: 0,
  EXCLUSIVE: 1
};

const FAKE_SITE = "THE_FAKE_SITE";

const AVAILABLE_SITES = {
  nike: {
    name: "nike",
    domain: "nike.com",
    url: "https://*.nike.com/*",
    match: ["cart", "checkout"],
    refresh: ["cart"]
  },

  macys: {
    name: "macys",
    domain: "macys.com",
    url: "https://*.macys.com/*",
    match: ["my-bag"]
  },

  adidas: {
    name: "adidas",
    domain: "adidas.com",
    url: "https://*.adidas.com/*",
    match: ["cart"],
    react: true
  },

  newbalance: {
    name: "newbalance",
    domain: "newbalance.com",
    url: "https://*.newbalance.com/*",
    match: ["Cart-Show"]
  },
  reebok: {
    name: "reebok",
    domain: "reebok.com",
    url: "https://*.reebok.com/*",
    match: ["cart"],
    refresh: ["cart"]
  },
  forever21: {
    name: "forever21",
    domain: "forever21.com",
    url: "https://*.forever21.com/*",
    match: ["basket"]
  },
  maccosmetics: {
    name: "maccosmetics",
    domain: "maccosmetics.com",
    url: "https://*.maccosmetics.com/*",
    match: ["viewcart"]
  },
  journeys: {
    name: "journeys",
    domain: "journeys.com",
    url: "https://*.journeys.com/*",
    match: ["cart"]
  },
  dell: {
    name: "dell",
    domain: "dell.com",
    url: "https://*.dell.com/*",
    match: ["cart", "buy"]
  },
  gnc: {
    name: "gnc",
    domain: "gnc.com",
    url: "https://*.gnc.com/*",
    match: ["cart", "Cart-SubmitForm"],
    refresh: ["cart", "Cart-SubmitForm"]
  },
  ae: {
    name: "ae",
    domain: "gnc.com",
    url: "https://*.ae.com/*",
    match: ["cart"]
  },
  calvinklein: {
    name: "calvinklein",
    domain: "calvinklein.us",
    url: "https://*.calvinklein.us/*",
    match: ["AjaxOrderItemDisplayView"]
  },
  asos: {
    name: "asos",
    domain: "asos.com",
    url: "https://*.asos.com/*",
    match: ["secure"]
  },
  underarmour: {
    name: "underarmour",
    domain: "underarmour.com",
    url: "https://*.underarmour.com/*",
    match: ["checkout"]
  },
  shoes: {
    name: "shoes",
    domain: "shoes.com",
    url: "https://*.shoes.com/*",
    match: ["cart"]
  },
  saksoff5th: {
    name: "saksoff5th",
    domain: "saksoff5th.com",
    url: "https://*.saksoff5th.com/*",
    match: ["checkout"]
  },
  nordstrom: {
    name: "nordstrom",
    domain: "nordstrom.com",
    url: "https://*.nordstrom.com/*",
    match: ["checkout"]
  },
  nordstromrack: {
    name: "nordstromrack",
    domain: "nordstromrack.com",
    url: "https://*.nordstromrack.com/*",
    match: ["checkout"]
  },
  coach: {
    name: "coach",
    domain: "coach.com",
    url: "https://*.coach.com/*",
    match: ["color"]
  },
  michaelkors: {
    name: "michaelkors",
    domain: "michaelkors.com",
    url: "https://*.michaelkors.com/*",
    match: ["checkout"]
  },
  finishline: {
    name: "finishline",
    domain: "finishline.com",
    url: "https://*.finishline.com/*",
    match: ["checkout", "cart"],
    refresh: ["cart"]
  },

  footlocker: {
    name: "footlocker",
    domain: "footlocker.com",
    url: "https://*.footlocker.com/*",
    match: ["cart"]
  },
  urbanoutfitters: {
    name: "urbanoutfitters",
    domain: "urbanoutfitters.com",
    url: "https://*.urbanoutfitters.com/*",
    match: ["checkout"]
  },
  amazon: {
    name: "amazon",
    domain: "amazon.com",
    url: "https://*.amazon.com/*",
    match: ["buy"]
  },
  ebay: {
    name: "ebay",
    domain: "ebay.com",
    url: "https://*.ebay.com/*",
    match: ["rxo"]
  },
  bestbuy: {
    name: "bestbuy",
    domain: "bestbuy.com",
    url: "https://*.bestbuy.com/*",
    match: ["checkout"]
  },
  clinique: {
    name: "clinique",
    domain: "clinique.com",
    url: "https://*.clinique.com/*",
    match: ["viewcart"]
  },
  thenorthface: {
    name: "thenorthface",
    domain: "thenorthface.com",
    url: "https://*.thenorthface.com/*",
    match: ["OrderItemDisplay"]
  },
  columbia: {
    name: "columbia",
    domain: "columbia.com",
    url: "https://*.columbia.com/*",
    match: ["cart"]
  },
  neimanmarcus: {
    name: "neimanmarcus",
    domain: "neimanmarcus.com",
    url: "https://*.neimanmarcus.com/*",
    match: ["checkout"]
  },
  target: {
    name: "target",
    domain: "target.com",
    url: "https://*.target.com/*",
    match: ["co-cart"]
  },
  sunglasshut: {
    name: "sunglasshut",
    domain: "sunglasshut.com",
    url: "https://*.sunglasshut.com/*",
    match: ["AjaxOrderItemDisplayView"]
  },
  sephora: {
    name: "sephora",
    domain: "sephora.com",
    url: "https://*.sephora.com/*",
    match: ["basket"]
  },
  ulta: {
    name: "ulta",
    domain: "ulta.com",
    url: "https://*.ulta.com/*",
    match: ["bag"]
  },
  bathandbodyworks: {
    name: "bathandbodyworks",
    domain: "bathandbodyworks.com",
    url: "https://*.bathandbodyworks.com/*",
    match: ["cart"]
  },
  bloomingdales: {
    name: "bloomingdales",
    domain: "bloomingdales.com",
    url: "https://*.bloomingdales.com/*",
    match: ["my-bag"]
  },
  abercrombie: {
    name: "abercrombie",
    domain: "abercrombie.com",
    url: "https://*.abercrombie.com/*",
    match: ["OrderItemDisplayView"]
  },
  pacsun: {
    name: "pacsun",
    domain: "pacsun.com",
    url: "https://*.pacsun.com/*",
    match: ["Cart-Show"]
  },
  kohls: {
    name: "kohls",
    domain: "kohls.com",
    url: "https://*.kohls.com/*",
    match: ["checkout"]
  },
  converse: {
    name: "converse",
    domain: "converse.com",
    url: "https://*.converse.com/*",
    match: ["shop-cart"]
  },
  bobbibrowncosmetics: {
    name: "bobbibrowncosmetics",
    domain: "bobbibrowncosmetics.com",
    url: "https://*.bobbibrowncosmetics.com/*",
    match: ["checkout"]
  },
  kiehls: {
    name: "kiehls",
    domain: "kiehls.com",
    url: "https://*.kiehls.com/*",
    match: ["cart"]
  },
  esteelauder: {
    name: "esteelauder",
    domain: "esteelauder.com",
    url: "https://*.esteelauder.com/*",
    match: ["checkout"]
  },
  drmartens: {
    name: "drmartens",
    domain: "drmartens.com",
    url: "https://*.drmartens.com/*",
    match: ["cart"]
  },
  lenovo: {
    name: "lenovo",
    domain: "lenovo.com",
    url: "https://*.lenovo.com/*",
    match: ["cart"]
  },
  hm: {
    name: "hm",
    domain: "hm.com",
    url: "https://*.hm.com/*",
    match: ["cart"]
  },
  katespade: {
    name: "katespade",
    domain: "katespade.com",
    url: "https://*.katespade.com/*",
    match: ["shopping-bag"]
  },
  kennethcole: {
    name: "kennethcole",
    domain: "kennethcole.com",
    url: "https://*.kennethcole.com/*",
    match: ["cart"]
  },
  toryburch: {
    name: "toryburch",
    domain: "toryburch.com",
    url: "https://*.toryburch.com/*",
    match: ["Cart-Show"]
  },
  levi: {
    name: "levi",
    domain: "levi.com",
    url: "https://*.levi.com/*",
    match: ["cart"]
  },
  loccitane: {
    name: "loccitane",
    domain: "loccitane.com",
    url: "https://*.loccitane.com/*",
    match: ["cart"]
  },
  backcountry: {
    name: "backcountry",
    domain: "backcountry.com",
    url: "https://*.backcountry.com/*",
    match: ["checkout"]
  },
  patagonia: {
    name: "patagonia",
    domain: "patagonia.com",
    url: "https://*.patagonia.com/*",
    match: ["cart"]
  },
  tillys: {
    name: "tillys",
    domain: "tillys.com",
    url: "https://*.tillys.com/*",
    match: ["cart"]
  },
  vitacost: {
    name: "vitacost",
    domain: "vitacost.com",
    url: "https://*.vitacost.com/*",
    match: ["Checkout"]
  },
  champssports: {
    name: "champssports",
    domain: "champssports.com",
    url: "https://*.champssports.com/*",
    match: ["cart"]
  },
  carters: {
    name: "carters",
    domain: "carters.com",
    url: "https://*.carters.com/*",
    match: ["cart"]
  },
  dickssportinggoods: {
    name: "dickssportinggoods",
    domain: "dickssportinggoods.com",
    url: "https://*.dickssportinggoods.com/*",
    match: ["DSGPaymentViewCmd"]
  },

  //  hibbett: {
  //  name: "hibbett",
  //    domain: "hibbett.com",
  //    url: "https://*.hibbett.com/*",
  //    match: ["cart"]
  //  },

  jimmyjazz: {
    name: "jimmyjazz",
    domain: "jimmyjazz.com",
    url: "https://*.jimmyjazz.com/*",
    match: ["cart"]
  },
  famousfootwear: {
    name: "famousfootwear",
    domain: "famousfootwear.com",
    url: "https://*.famousfootwear.com/*",
    match: ["Checkout"]
  },
  fossil: {
    name: "fossil",
    domain: "fossil.com",
    url: "https://*.fossil.com/*",
    match: ["shopping-bag"]
  },
  gap: {
    name: "gap",
    domain: "gap.com",
    url: "https://*.gap.com/*",
    match: ["shopping_bag"]
  },
  guess: {
    name: "guess",
    domain: "guess.com",
    url: "https://*.guess.com/*",
    match: ["ShoppingBag"]
  },
  loft: {
    name: "loft",
    domain: "loft.com",
    url: "https://*.loft.com/*",
    match: ["checkout"]
  },
  zippo: {
    name: "zippo",
    domain: "zippo.com",
    url: "https://*.zippo.com/*",
    match: ["checkouts"]
  },
  topshop: {
    name: "topshop",
    domain: "topshop.com",
    url: "https://*.topshop.com/*",
    match: ["payment"]
  },

  jcrew: {
    name: "jcrew",
    domain: "jcrew.com",
    url: "https://*.jcrew.com/*",
    match: ["shoppingbag"]
  },

  sneakersnstuff: {
    name: "sneakersnstuff",
    domain: "sneakersnstuff.com",
    url: "https://*.sneakersnstuff.com/*",
    match: ["cart"]
  },
  "ray-ban": {
    name: "ray-ban",
    domain: "ray-ban.com",
    url: "https://*.ray-ban.com/*",
    match: ["ShopCartDisplayView"]
  },

  rei: {
    name: "rei",
    domain: "rei.com",
    url: "https://*.rei.com/*",
    match: ["payment"]
  },

  tjx: {
    name: "tjx",
    domain: "tjx.com",
    url: "https://*.tjx.com/*",
    match: ["cart"]
  },
  ugg: {
    name: "ugg",
    domain: "ugg.com",
    url: "https://*.ugg.com/*",
    match: ["COShipping"]
  },
  hotels: {
    name: "hotels",
    domain: "hotels.com",
    url: "https://*.hotels.com/*",
    match: ["bookingInitialise"]
  },
  eastbay: {
    name: "eastbay",
    domain: "eastbay.com",
    url: "https://*.eastbay.com/*",
    match: ["cart"]
  },
  shoebacca: {
    name: "shoebacca",
    domain: "shoebacca.com",
    url: "https://*.shoebacca.com/*",
    match: ["checkout"]
  },
  keenfootwear: {
    name: "keenfootwear",
    domain: "keenfootwear.com",
    url: "https://*.keenfootwear.com/*",
    match: ["cart"]
  },
  hunterboots: {
    name: "hunterboots",
    domain: "hunterboots.com",
    url: "https://*.hunterboots.com/*",
    match: ["checkout"]
  },
  rakuten: {
    name: "rakuten",
    domain: "rakuten.com",
    url: "https://*.rakuten.com/*",
    match: ["buy"]
  },
  acer: {
    name: "acer",
    domain: "acer.com",
    url: "https://*.acer.com/*",
    match: ["checkout"]
  },
  americanapparel: {
    name: "americanapparel",
    domain: "americanapparel.com",
    url: "https://*.americanapparel.com/*",
    match: ["cart"]
  },
  elfcosmetics: {
    name: "elfcosmetics",
    domain: "elfcosmetics.com",
    url: "https://*.elfcosmetics.com/*",
    match: ["Cart", "shopping-bag"]
  },
  crocs: {
    name: "crocs",
    domain: "crocs.com",
    url: "https://*.crocs.com/*",
    match: ["Cart-Show"]
  },
  "kipling-usa": {
    name: "kipling-usa",
    domain: "kipling-usa.com",
    url: "https://*.kipling-usa.com/*",
    match: ["cart"]
  },
  foreo: {
    name: "foreo",
    domain: "foreo.com",
    url: "https://*.foreo.com/*",
    match: ["cart"]
  },
  juicycouture: {
    name: "juicycouture",
    domain: "juicycouture.com",
    url: "https://*.juicycouture.com/*",
    match: ["checkouts"]
  },
  bebe: {
    name: "bebe",
    domain: "bebe.com",
    url: "https://*.bebe.com/*",
    match: ["checkouts"]
  },
  c21stores: {
    name: "c21stores",
    domain: "c21stores.com",
    url: "https://*.c21stores.com/*",
    match: ["cart"]
  },
  belk: {
    name: "belk",
    domain: "belk.com",
    url: "https://*.belk.com/*",
    match: ["shopping-bag"]
  },
  "1800contacts": {
    name: "1800contacts",
    domain: "1800contacts.com",
    url: "https://*.1800contacts.com/*",
    match: ["cart"]
  },
  puma: {
    name: "puma",
    domain: "puma.com",
    url: "https://*.puma.com/*",
    match: ["cart",'checkout']
  }
};
