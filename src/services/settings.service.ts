import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { SysVariables } from '../services/utils.service';

@Injectable()
export class Settings {

    private settings: any;
    private theme: BehaviorSubject<string>;
    private user: any;
    private savedTheme: string;

    constructor(private sys: SysVariables) {
        this.settings = this.loadSettings();
        this.user = this.loadUser();

        if (this.settings && this.user) {
            for (var i = 0; i < this.settings.length; i++) {
                var item = this.settings[i];

                if (item.user === this.user.username)
                    this.savedTheme = item.theme;
            }
        }

        if (this.savedTheme)
            this.theme = new BehaviorSubject(this.savedTheme);
        else
            this.theme = new BehaviorSubject('default-theme');
    }

    setActiveTheme(val) {
        this.theme.next(val);
    }

    getActiveTheme() {
        return this.theme.asObservable();
    }

    saveSettings(chosenTheme: string) {

        this.user = this.loadUser();
        this.settings = this.loadSettings();

        if (this.settings && this.user) {
            var exists = false;

            for (var i = 0; i < this.settings.length; i++) {
                var item = this.settings[i];

                if (item.user === this.user.username) {
                    exists = true;
                    item.theme = chosenTheme;
                }
            }

            if (!exists)
                this.settings.push({ user: this.user.username, theme: chosenTheme });
        } else
            this.settings = [{ user: this.user.username, theme: chosenTheme }];

        var data = JSON.stringify(this.settings);
        localStorage.setItem(this.sys.AppPrefix + '.settings', data);

        this.settings = JSON.parse(data);
    }

    loadSettings(): any {
        var data = localStorage.getItem(this.sys.AppPrefix + '.settings');
        if (data) {
            this.settings = JSON.parse(data);
            return JSON.parse(data);
        }
        return null;
    }

    loadUser(): any {
        var data = localStorage.getItem(this.sys.AppPrefix + '.user');
        if (data) {
            this.settings = JSON.parse(data);
            return JSON.parse(data);
        }
        return null;
    }

    loadSettingsFromUser() {
        this.user = this.loadUser();
        this.settings = this.loadSettings();

        if (this.settings && this.user) {
            for (var i = 0; i < this.settings.length; i++) {
                var item = this.settings[i];

                if (item.user === this.user.username)
                    this.savedTheme = item.theme;
            }
        }

        if (this.savedTheme)
            this.theme = new BehaviorSubject(this.savedTheme);
        else
            this.theme = new BehaviorSubject('default-theme');
    }
}