import { Injectable } from '@angular/core';
import { ToastController, AlertController, ModalController, LoadingController, Loading, Modal } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import moment from 'moment';
import 'moment/locale/pt-br';
import 'rxjs/Rx';

@Injectable()
export class SysVariables {
  private loadedConfig: any;

  private _apiUrl: string = 'http://localhost:5100/';
  private _appPrefix: string = 'pmforms';
  private _appTitle: string = 'Biosev Formulários Digitais';
  private _appVersion: string = '0.0.1';
  private _appEnvironment: string = 'Development';
  private _clientName: string = 'BIOSEV';
  private _defaultPageSize: number = 15;
  private _extensionFileAllowed: string = 'JPG,GIF,PNG,PDF,DOC,DOCX,PPT,PPTX,XLS,XLSX,ZIP,RAR';
  private _publishDate: string = '01/01/2018 00:00:00';
  private _syncFillInfo: string = '08:00:00';

  get ApiUrl(): string {
    return this.loadedConfig
      ? this.loadedConfig.ApiUrl
        ? this.loadedConfig.ApiUrl
        : this._apiUrl
      : this._apiUrl;
  }
  get AppPrefix(): string {
    return this.loadedConfig
      ? this.loadedConfig.AppPrefix
        ? this.loadedConfig.AppPrefix
        : this._appPrefix
      : this._appPrefix;
  }
  get AppTitle(): string {
    return this.loadedConfig
      ? this.loadedConfig.AppTitle
        ? this.loadedConfig.AppTitle
        : this._appTitle
      : this._appTitle;
  }
  get AppVersion(): string {
    return this.loadedConfig
      ? this.loadedConfig.AppVersion
        ? this.loadedConfig.AppVersion
        : this._appVersion
      : this._appVersion;
  }
  get AppEnvironment(): string {
    return this.loadedConfig
      ? this.loadedConfig.AppEnvironment
        ? this.loadedConfig.AppEnvironment
        : this._appEnvironment
      : this._appEnvironment;
  }
  get ClientName(): string {
    return this.loadedConfig
      ? this.loadedConfig.ClientName
        ? this.loadedConfig.ClientName
        : this._clientName
      : this._clientName;
  }
  get DefaultPageSize(): number {
    return this.loadedConfig
      ? this.loadedConfig.DefaultPageSize
        ? this.loadedConfig.DefaultPageSize
        : this._defaultPageSize
      : this._defaultPageSize;
  }
  get ExtensionFileAllowed(): number {
    return this.loadedConfig
      ? this.loadedConfig.ExtensionFileAllowed
        ? this.loadedConfig.ExtensionFileAllowed
        : this._extensionFileAllowed
      : this._extensionFileAllowed;
  }
  get PublishDate(): string {
    return this.loadedConfig
      ? this.loadedConfig.PublishDate
        ? this.loadedConfig.PublishDate
        : this._publishDate
      : this._publishDate;
  }
  get SyncFillInfo(): string {
    return this.loadedConfig
      ? this.loadedConfig.SyncFillInfo
        ? this.loadedConfig.SyncFillInfo
        : this._syncFillInfo
      : this._syncFillInfo;
  }

  save(data) {
    this.loadedConfig = data;
  }
}

export enum Position {
  top,
  bottom,
  middle
}

@Injectable()
export class Utilities {

  public isOnline: Observable<boolean>;

  constructor(
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public loadCtrl: LoadingController) {
    this.isOnline = Observable.merge(
      Observable.of(navigator.onLine),
      Observable.fromEvent(window, 'online').mapTo(true),
      Observable.fromEvent(window, 'offline').mapTo(false)
    );
  }

  private modalBaseOptions = {
    showBackdrop: true,
    enableBackdropDismiss: false
  };

  private loaderBaseOptions = {
    content: `Carregando. Aguarde...`
  };

  toast(text: string, duration: number = 5000, position: Position = Position.bottom, showCloseButton: boolean = false) {
    if (!text) return;
    let toast = this.toastCtrl.create({
      message: text,
      duration: duration,
      position: Position[position],
      showCloseButton: showCloseButton
    });
    toast.present();
  }

  alert(message: string, title: string = 'Atenção', buttons: any = [{ text: 'OK' }], enableBackdropDismiss: boolean = false) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: buttons,
      enableBackdropDismiss: enableBackdropDismiss
    });
    alert.present();
  }

  confirm(message: string, title: string = 'Atenção', okHandler: any) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      enableBackdropDismiss: false,
      buttons: [
        { text: 'OK', handler: okHandler },
        { text: 'Cancelar' }]
    });
    alert.present();
  }

  showModal(page, data = null, options = this.modalBaseOptions, callback = null): Modal {
    let modal = this.modalCtrl.create(page, data, this.modalBaseOptions);
    if (callback) modal.onDidDismiss(data => callback(data));
    modal.present();
    return modal;
  }

  showLoading(options = this.loaderBaseOptions): Loading {
    let loader = this.loadCtrl.create(options);
    loader.present();
    return loader;
  }

  getDate(withTime: boolean, isoString: boolean = false): string {
    let dt = moment();
    if (!isoString) {
      if (withTime)
        return dt.format('YYYY-MM-DD HH:mm:ss');
      else
        return dt.format('YYYY-MM-DD');
    } else {
      if (withTime)
        return dt.format();
      else
        return dt.startOf('day').format();
    }
  }

  getTime(): string {
    let dt = moment();
    return dt.format('HH:mm:ss');
  }

  parseISOString(s) {
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
  }

  getGuid(): string {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4() + s4() + s4()}`;
  }

  private dollarSign = '$';
  private emptyString = '';
  private comma = ',';
  private period = '.';
  private digitRegExp = /\d/;

  createNumberMask({
    prefix = this.dollarSign,
    suffix = this.emptyString,
    includeThousandsSeparator = true,
    thousandsSeparatorSymbol = this.comma,
    allowDecimal = false,
    decimalSymbol = this.period,
    decimalLimit = 2,
    requireDecimal = false,
    allowNegative = false,
    allowLeadingZeroes = false,
    integerLimit = null
  } = {}) {
    const prefixLength = prefix && prefix.length || 0;
    const suffixLength = suffix && suffix.length || 0;
    const thousandsSeparatorSymbolLength = thousandsSeparatorSymbol && thousandsSeparatorSymbol.length || 0;

    function numberMask(rawValue = this.emptyString) {
      const rawValueLength = rawValue.length;

      if (
        rawValue === this.emptyString ||
        (rawValue[0] === prefix[0] && rawValueLength === 1)
      ) {
        return prefix.split(this.emptyString).concat([this.digitRegExp]).concat(suffix.split(this.emptyString));
      } else if (
        rawValue === decimalSymbol &&
        allowDecimal
      ) {
        return prefix.split(this.emptyString).concat(['0', decimalSymbol, this.digitRegExp]).concat(suffix.split(this.emptyString));
      }

      const isNegative = (rawValue[0] === this.minus) && this.allowNegative;
      // if negative remove "-" sign
      if (isNegative) {
        rawValue = rawValue.toString().substr(1);
      }

      const indexOfLastDecimal = rawValue.lastIndexOf(decimalSymbol);
      const hasDecimal = indexOfLastDecimal !== -1;

      let integer;
      let fraction;
      let mask;

      // remove the suffix
      if (rawValue.slice(suffixLength * -1) === suffix) {
        rawValue = rawValue.slice(0, suffixLength * -1);
      }

      if (hasDecimal && (allowDecimal || requireDecimal)) {
        integer = rawValue.slice(rawValue.slice(0, prefixLength) === prefix ? prefixLength : 0, indexOfLastDecimal);

        fraction = rawValue.slice(indexOfLastDecimal + 1, rawValueLength);
        fraction = this.convertToMask(fraction.replace(this.nonDigitsRegExp, this.emptyString));
      } else {
        if (rawValue.slice(0, prefixLength) === prefix) {
          integer = rawValue.slice(prefixLength);
        } else {
          integer = rawValue;
        }
      }

      if (integerLimit && typeof integerLimit === this.number) {
        const thousandsSeparatorRegex = thousandsSeparatorSymbol === '.' ? '[.]' : `${thousandsSeparatorSymbol}`;
        const numberOfThousandSeparators = (integer.match(new RegExp(thousandsSeparatorRegex, 'g')) || []).length;

        integer = integer.slice(0, integerLimit + (numberOfThousandSeparators * thousandsSeparatorSymbolLength));
      }

      integer = integer.replace(this.nonDigitsRegExp, this.emptyString);

      if (!allowLeadingZeroes) {
        integer = integer.replace(/^0+(0$|[^0])/, '$1');
      }

      integer = (includeThousandsSeparator) ? this.addThousandsSeparator(integer, thousandsSeparatorSymbol) : integer;

      mask = this.convertToMask(integer);

      if ((hasDecimal && allowDecimal) || requireDecimal === true) {
        if (rawValue[indexOfLastDecimal - 1] !== decimalSymbol) {
          mask.push(this.caretTrap);
        }

        mask.push(decimalSymbol, this.caretTrap);

        if (fraction) {
          if (typeof decimalLimit === this.number) {
            fraction = fraction.slice(0, decimalLimit);
          }

          mask = mask.concat(fraction);
        }

        if (requireDecimal === true && rawValue[indexOfLastDecimal - 1] === decimalSymbol) {
          mask.push(this.digitRegExp);
        }
      }

      if (prefixLength > 0) {
        mask = prefix.split(this.emptyString).concat(mask);
      }

      if (isNegative) {
        // if user is entering a negative number, add a mask placeholder spot to attract the caret to it.
        if (mask.length === prefixLength) {
          mask.push(this.digitRegExp);
        }

        mask = [this.minusRegExp].concat(mask);
      }

      if (suffix.length > 0) {
        mask = mask.concat(suffix.split(this.emptyString));
      }

      return mask;
    }

    // numberMask.instanceOf = 'createNumberMask';
    return numberMask;
  }

  convertToMask(strNumber) {
    return strNumber
      .split(this.emptyString)
      .map((char) => this.digitRegExp.test(char) ? this.digitRegExp : char);
  }

  addThousandsSeparator(n, thousandsSeparatorSymbol) {
    return n.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparatorSymbol);
  }

}
