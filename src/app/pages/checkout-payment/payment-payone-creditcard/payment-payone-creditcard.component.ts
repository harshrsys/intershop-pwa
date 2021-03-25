import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Attribute } from 'ish-core/models/attribute/attribute.model';
import { PaymentMethod } from 'ish-core/models/payment-method/payment-method.model';
import { ScriptLoaderService } from 'ish-core/utils/script-loader/script-loader.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// allows access to concardis js functionality
// tslint:disable-next-line:no-any
declare var Payone: any;

@Component({
  selector: 'ish-payment-payone-creditcard',
  templateUrl: './payment-payone-creditcard.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class PaymentPayoneCreditcardComponent implements OnChanges, OnDestroy, OnInit {
  payoneCreditCardForm: FormGroup;
  constructor(protected scriptLoader: ScriptLoaderService, protected cd: ChangeDetectorRef) {}

  /**
   * payone payment method, needed to get configuration parameters
   */
  @Input() paymentMethod: PaymentMethod;

  /**
   * should be set to true by the parent, if component is visible
   */
  @Input() activated = false;

  @Output() cancel = new EventEmitter<void>();
  @Output() submit = new EventEmitter<{ parameters: Attribute<string>[]; saveAllowed: boolean }>();

  private destroy$ = new Subject();

  /**
   * flag to make sure that the init script is executed only once
   */
  scriptLoaded = false;

  // tslint:disable-next-line: no-any
  iframes: any;

  ngOnInit() {
    this.payoneCreditCardForm = new FormGroup({});
  }

  /**
   * load payone script if component is shown
   */
  ngOnChanges() {
    if (this.paymentMethod) {
      this.loadScript();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected getParamValue(name: string, errorMessage: string): string {
    const parameter = this.paymentMethod.hostedPaymentPageParameters.find(param => param.name === name);
    if (!parameter || !parameter.value) {
      console.log(errorMessage);
      //this.errorMessage.general.message = errorMessage;
      return;
    }
    return parameter.value;
  }

  loadScript() {
    // load script only once if component becomes visible
    if (this.activated) {

      const requestParam = JSON.parse(this.getParamValue('request', 'checkout.credit_card.request.param.error.notFound'));
      let configParam = JSON.parse(this.getParamValue('config', 'checkout.credit_card.config.param.error.notFound'));


      this.scriptLoaded = true;
      this.scriptLoader
        .load('https://secure.pay1.de/client-api/js/v1/payone_hosted_min.js')
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          // append localization language: Payone.ClientApi.Language.en, Language to display error-messages (default:Payone.ClientApi.Language.en)
          configParam.language = eval(this.getParamValue('language', ''));

          const request = requestParam;
          const config = configParam;

          // setup
          this.iframes = new Payone.ClientApi.HostedIFrames(config, request);
        });
    }
  }

  /**
   * cancel new payment instrument, hides and resets the parameter form
   */
  cancelNewPaymentInstrument() {
    this.payoneCreditCardForm.reset();
    this.cancel.emit();
  }

  /**
   * submit cybersource payment form
   */
  submitNewPaymentInstrument() {
    console.log("submit happened");
    if (this.iframes.isComplete()) {
      // Perform "CreditCardCheck" to create and get a PseudoCardPan; then call your function "payCallback"

      //this.iframes.creditCardCheck('payoneCreditCardCallback');
      this.iframes.creditCardCheck((response) => this.payoneCreditCardCallback(response));
      console.log("callback method not working");
    }
  }

  public payoneCreditCardCallback(response: any/*: {status: string, pseudocardpan: string, truncatedcardpan: string}*/) {

    console.log("inside callback method");
    console.log(response);
    //this.resetErrors();

    /*if (response.status === "VALID" && !this.payoneCreditCardForm.invalid) {
      this.submit.emit({
        parameters: [
          { name: 'pseudocardpan', value: response.pseudocardpan },
          { name: 'truncatedcardpan', value: response.truncatedcardpan },
        ],
        saveAllowed: false,
      });
    }
    // else: error message is shown in the error div
    this.cd.detectChanges();*/
  }

}
