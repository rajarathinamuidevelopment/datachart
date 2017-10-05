import { Component, OnInit, Input, Output } from '@angular/core';
import { Injectable } from '@angular/core';
import { TranslateService } from '../translate';

@Injectable()
@Component({
    providers: [TranslateService]
})
export class TranslateLangService {
    public translatedArray: any[];
    public supportedLangs: any[];
    public translatedText: string;

    constructor(private _translate: TranslateService) {
        this.selectLang('en');
        this.supportedLangs = [
            { display: 'English', value: 'en' },
            { display: 'Español', value: 'es' },
            // { display: '华语', value: 'zh' },
        ];
    }
    isCurrentLang(lang: string) {
        return lang === this._translate.currentLang;
    }

    selectLang(lang: string) {
        this._translate.use(lang);
        this.refreshText();
    }

    refreshText() {
        this.translatedArray = [];
        const keys = [
            { key: 'Account Id', value: 'Account Id' },
            { key: 'Account Name', value: 'Account Name' },
            { key: 'Account Number', value: 'Account Number' },
            { key: 'account_type', value: 'account_type' },
            { key: 'account_category', value: 'account_category' },
            { key: 'account_status', value: 'account_status' },
            { key: 'account_update', value: 'account_update' },
            { key: 'address_mgmt', value: 'address_mgmt' },
            { key: 'Address Line 1', value: 'Address Line 1' },
            { key: 'Address Line 2', value: 'Address Line 2' },
            { key: 'billing_info', value: 'billing_info' },
            { key: 'City', value: 'City' },
            { key: 'CCID', value: 'CCID' },
            { key: 'create_new_card', value: 'create_new_card' },
            { key: 'create_new_contact', value: 'create_new_contact' },
            { key: 'Current Month', value: 'Current Month' },
            { key: 'company_name', value: 'company_name' },
            { key: 'contact_mgmt', value: 'contact_mgmt' },
            { key: 'Country', value: 'Country' },
            { key: 'Device #', value: 'Device #' },
            { key: 'Device Type', value: 'Device Type' },
            { key: 'device_update', value: 'device_update' },
            { key: 'Date', value: 'Date' },
            { key: 'Downlink Bytes', value: 'Downlink Bytes' },
            { key: 'Daily', value: 'Daily' },
            { key: 'events', value: 'events' },
            { key: 'Email Address', value: 'Email Address' },
            { key: 'empty_table_msg', value: 'empty_table_msg' },
            { key: 'First Name', value: 'First Name' },
            { key: 'IMEI', value: 'IMEI' },
            { key: 'IMSI', value: 'IMSI' },
            { key: 'key_alerts', value: 'key_alerts' },
            { key: 'key_msg', value: 'key_msg' },
            { key: 'Last Name', value: 'Last Name' },
            { key: 'Organization', value: 'Organization' },
            { key: 'Make', value: 'Make' },
            { key: 'Model', value: 'Model' },
            { key: 'new_address', value: 'new_address' },
            { key: 'new_device_assoc', value: 'new_device_assoc' },
            { key: 'privacy_pref', value: 'privacy_pref' },
            { key: 'Provider', value: 'Provider' },
            { key: 'Period', value: 'Period' },
            { key: 'Previous Month', value: 'Previous Month' },
            { key: 'Phone Number', value: 'Phone Number' },
            { key: 'Pick date', value: 'Pick date' },
            { key: 'reset_pin', value: 'reset_pin' },
            { key: 'Results', value: 'Results' },
            { key: 'State', value: 'State' },
            { key: 'Split by', value: 'Split by' },
            { key: 'Search', value: 'Search' },
            { key: 'Total Bytes', value: 'Total Bytes' },
            { key: 'update', value: 'update' },
            { key: 'update_events', value: 'update_events' },
            { key: 'update_existing_add', value: 'update_existing_add' },
            { key: 'update_existing_card', value: 'update_existing_card' },
            { key: 'update_existing_contact', value: 'update_existing_contact' },
            { key: 'Uplink Bytes', value: 'Uplink Bytes' },
            { key: 'vehicle_mgmt', value: 'vehicle_mgmt' },
            { key: 'vehicle_swap', value: 'vehicle_swap' },
            { key: 'VIN', value: 'VIN' },
            { key: 'VIN (Last 7)', value: 'VIN (Last 7)' },
            { key: 'Year', value: 'Year' },
            { key: 'Zipcode', value: 'Zipcode' },
            { key: 'card_type', value: 'card_type' },
            { key: 'card_holder_name', value: 'card_holder_name' },
            { key: 'credit_card_no', value: 'credit_card_no' },
            { key: 'work_phone_no', value: 'work_phone_no' },
            { key: 'home_phone_no', value: 'home_phone_no' },
            { key: 'mobile_phone_no', value: 'mobile_phone_no' },
            { key: 'preferred_contact_mtd', value: 'preferred_contact_mtd' },
            { key: 'alt_contact_mtd', value: 'alt_contact_mtd' },
            { key: 'address_type', value: 'address_type' },
            { key: 'contact_type', value: 'contact_type' },
            { key: 'CVC', value: 'CVC' },
            { key: 'validate', value: 'validate' },
            { key: 'expiration_date', value: 'expiration_date' },
            { key: 'vehicle', value: 'vehicle' },
            { key: 'device', value: 'device' },
            { key: 'head_unit_type', value: 'head_unit_type' },
            { key: 'wireless_carrier', value: 'wireless_carrier' },
            { key: 'MDN/MSISDN', value: 'MDN/MSISDN' },
            { key: 'chk_vehicle_eligibility', value: 'chk_vehicle_eligibility' },
            { key: 'create', value: 'create' },
            { key: 'modify', value: 'modify' },
            { key: 'used', value: 'used' },
            { key: 'remaining', value: 'remaining' },
            { key: 'card_detail', value: 'card_detail' },
            { key: 'color', value: 'color' },
            { key: 'device_id', value: 'device_id' },
            { key: 'head_unit', value: 'head_unit' },
            { key: 'Serial#', value: 'Serial#' },
            { key: 'created', value: 'created' },
            { key: 'telematic_req_history', value: 'telematic_req_history' },
            { key: 'device_event_history', value: 'device_event_history' },
            { key: 'subscription_history', value: 'subscription_history' },
            { key: 'notifications_history', value: 'notifications_history' },
            { key: 'account_mgmt_history', value: 'account_mgmt_history' },
            { key: 'from', value: 'from' },
            { key: 'to', value: 'to' },
            
        ];
        keys.forEach(element => {
            return this.translatedArray[element.key] = this._translate.instant(element.value);
        });

    }
}
