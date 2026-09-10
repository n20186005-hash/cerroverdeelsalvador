/**
 * 单景点 SEO 实体绑定配置
 * 汇总本站点的地理实体信息、坐标、权威链接等，
 * 供 JSON-LD / Meta / 地图 / 页面组件统一引用。
 */
export const site = {
  // {{DOMAIN_NAME}}
  domain: 'cerroverdeelsalvador.com',
  baseUrl: 'https://cerroverdeelsalvador.com',

  // {{ATTRACTION_FULL_NAME}} 官方全称
  fullName: 'Parque Natural Cerro Verde',
  // {{ATTRACTION_SHORT_NAME}} 常用俗称 / 域名含义
  shortName: 'Cerro Verde',
  // 中文展示名（Google 中文收录名）
  fullNameZh: '绿山国家公园',

  // {{CITY_NAME}} / {{STATE_PROVINCE}} / {{COUNTRY_NAME}} / {{COUNTRY_CODE_2LETTER}}
  city: 'Santa Ana',
  region: 'Santa Ana Department',
  country: 'El Salvador',
  countryCode: 'SV',

  // {{LATITUDE}} / {{LONGITUDE}}（Google 列表坐标）
  latitude: 13.8258609,
  longitude: -89.6247083,

  // {{MAPS_SHARE_URL}}
  mapsUrl: 'https://maps.app.goo.gl/KcX4LexdqM6CahTi6',
  // {{MAPS_EMBED_SRC}}
  mapsEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6890.864170524958!2d-89.6247083!3d13.825860899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f62c6ca3fcc3e7b%3A0x854e0fbc80396b88!2z57u_5bGx5Zu95a625YWs5Zut!5e1!3m2!1szh-CN!2s!4v1788848694293!5m2!1szh-CN!2s',

  // {{NEARBY_LANDMARK_1}} / {{NEARBY_LANDMARK_2}}
  landmark1: 'Santa Ana Volcano',
  landmark2: 'Izalco Volcano',

  // {{GOVT_TOURISM_URL}} 当地政府 / 官方旅游局链接
  tourismUrl: 'https://elsalvador.travel/esp/',

  // 电话（Google 最新收录 +50372947255）
  phone: '+50372947255',
  plusCode: 'R9GG+84V El Salvador',

  // 评分（Google 最新）
  rating: '4.7',
  reviewCount: '6,892',

  // GA4
  ga4Id: 'G-HXM22WWPKP',

  // 首页 / OG 主图（public 目录下的实际文件，命名规范：{slug}-{序号}.jpg）
  heroImagePath: '/gallery/parque-natural-cerro-verde-1.jpg',
};

/** OG / JSON-LD 使用的绝对图片地址 */
export const heroImageUrl = `${site.baseUrl}/gallery/parque-natural-cerro-verde-1.jpg`;
