export class SystemConstant {
  public static REVISON = '230329.1';
  public static WEB_NAME = 'hcmute-portal-fe';

  public static CURRENT_INFO = 'customer_token';
  public static LOCATION = 'LOCATION';
  public static CURRENT_PROFILE = 'CURRENT_PROFILE';
  public static CURRENT_INFO_GOOGLE = 'CURRENT_INFO_GOOGLE';
  public static BASKET = 'BASKET';
  public static WISH_LIST = 'WISH_LIST';

  public static COORDINATES = [10.85063531707399, 106.7719145751954];

  public static ACTION = {
    ADD: 'ADD',
    EDIT: 'EDIT',
    DELETE: 'DELETE',
    VIEW: 'VIEW',
  };

  public static ROLE = {
    CUSTOMER: 'CUSTOMER',
  };
  public static MNG_ROLE = {
    ADMIN: 'ROLE_ADMIN',
  };

  public static ROLE_TITLE = [
    { id: SystemConstant.ROLE.CUSTOMER, title: { vi: 'Khách hàng', en: 'Customer' } },
  ];

  public static CkEditorCfg = {
    toolbar: {
      items: [
        'heading',
        '|',
        'removeFormat',
        'alignment',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'link',
        'imageInsert',
        'mediaEmbed',
        'highlight',
        '|',
        'outdent',
        'indent',
        '|',
        'fontSize',
        'fontBackgroundColor',
        'fontColor',
        'fontFamily',
        'bulletedList',
        'numberedList',
        'insertTable',
        'subscript',
        'superscript',
        'blockQuote',
        'undo',
        'redo',
        'findAndReplace',
        'codeBlock',
        'code',
        '|',
        'sourceEditing',
      ],
    },
    language: 'en',
    image: {
      toolbar: ['imageTextAlternative', 'imageStyle:inline', 'imageStyle:block', 'imageStyle:side', 'linkImage', 'resizeImage'],
      resizeOptions: [
        { name: 'resizeImage:original', value: null },
        { name: 'resizeImage:50', value: '75' },
        { name: 'resizeImage:50', value: '50' },
        { name: 'resizeImage:50', value: '25' },
      ],
      resizeUnit: '%',
    },
    table:
    {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableCellProperties', 'tableProperties'],
    },
    simpleUpload: {
      // uploadUrl: UrlConstant.API.CKE_IMG,
      uploadUrl: 'http://aaa.aaa',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem(SystemConstant.CURRENT_INFO) ?? '{}')?.token}`,
      },
    },
    mediaEmbed: {
      previewsInData: true,
      // Block mediaEmbed from domain;
      // Docs: https://ckeditor.com/docs/ckeditor5/latest/api/module_media-embed_mediaembed-MediaEmbedConfig.html
      // removeProviders: [],
    },
    extraPlugins: ['Notification'],
    removePlugins: ['MediaEmbedToolbar'],
  };
}
