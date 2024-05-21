export class SystemConstant {
  public static REVISON = '230329.1';
  public static WEB_NAME = 'hcmute-portal-fe';

  public static CURRENT_INFO = 'CURRENT_INFO';
  public static CURRENT_INFO_GOOGLE = 'CURRENT_INFO_GOOGLE';

  public static ACTION = {
    ADD: 'ADD',
    EDIT: 'EDIT',
    DELETE: 'DELETE',
    VIEW: 'VIEW',
  };

  public static ROLE = {
    STUDENT: 'ROLE_STUDENT',
  };
  public static MNG_ROLE = {
    ADMIN: 'ROLE_ADMIN',
  };

  public static ROLE_TITLE = [
    { id: SystemConstant.MNG_ROLE.ADMIN, title: { vi: 'Quản trị viên', en: 'Administrator' } },
    { id: SystemConstant.ROLE.STUDENT, title: { vi: 'Sinh viên', en: 'Student' } },
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
