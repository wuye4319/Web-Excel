module.exports = function getControlOptions(controlType) {
  const controlDefaultOptionMap = {
    'FormTextBox': {
      Mode: 'Normal',
      InputByScan: false,
      ScanUpdateEnable: false,
      NoRepeat: false,
      PlaceHolder: '',
    },
    'FormTextArea': {
      PlaceHolder: ''
    },
    'FormDateTime': {
      DateTimeMode: ''
    },
    'FormNumber': {
      NumberFormat: 0,
      DecimalPlaces: 1,
      ShowMode: false
    },
    'FormRadioButtonList': {
      DefaultItems: ''
    },
    'FormCheckboxList': {
      DefaultItems: ''
    },
    'FormDropDownList': {
      DefaultItems: ''
    },
    'FormUser': {
      UnitSelectionRange: '',
      PlaceHolder: ''
    },
    'FormDepartment': {
      UnitSelectionRange: '',
      PlaceHolder: ''
    },
    'FormAttachment': {
      MaxUploadSize: ''
    },
    'FormPhoto': {
      UploadMultiple: false,
      CameraOnly: false,
      HasWatermark: false,
      Compression: false
    },
    'FormGridView': {

    },
    'FormCreater': {

    },
    'FormOwner': {
      UnitSelectionRange: ''
    },
    'FormCreatedTime': {

    },
    'FormModifiedTime': {

    }
  };
  return controlDefaultOptionMap[controlType] || {};
}
