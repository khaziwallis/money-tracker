import { createMuiTheme } from '@material-ui/core/styles';

export class SideDrawer {
	private selector: string = "app-nav-content";
	private scrollClass: string = "app-nav-scroll-hidden-on-mobile";
	public toggle() {
		const el: Element = document.getElementsByClassName(this.selector)[0];
		if(el.classList.contains('active'))
			this.hide();
		else 
			this.show();
	}
	public hide() {
		const el: Element = document.getElementsByClassName(this.selector)[0];
		el.classList.remove('active');
		document.body.classList.remove(this.scrollClass)
	}
	public show() {
		const el: Element = document.getElementsByClassName(this.selector)[0];
		el.classList.add('active');
		document.body.classList.add(this.scrollClass)
	}

	public hideOnMobile() {
		if(window.innerWidth < createMuiTheme().breakpoints.values.md)
			this.hide();
	}
}


export class HeaderEvents {
	private appSelector: string = "app";
	private scrollHideClassSelector: string = "scrolling-bottom";
	public liveHideOnTopScroll() {
		const el: Element = document.getElementsByClassName(this.appSelector)[0];
		let lastScrollPos = 0;
		window.addEventListener("scroll", (ev: UIEvent)=> {
			// const rect: ClientRect = document.body.getBoundingClientRect();
			const current = window.scrollY;
			// console.log(window.scrollY, rect)
			if (current < lastScrollPos)
				el.classList.remove(this.scrollHideClassSelector)
			else
				el.classList.add(this.scrollHideClassSelector)
			lastScrollPos = current;
		})
	}
}

class CommonUiEventsClass {
	public enableSetupUI() {
		const appSelector: string = "app";
		const classToggle: string = "setup";
		const el: Element = document.getElementsByClassName(appSelector)[0];
		el.classList.add(classToggle)
	}
	public disableSetupUI() {
		const appSelector: string = "app";
		const classToggle: string = "setup";
		const el: Element = document.getElementsByClassName(appSelector)[0];
		el.classList.remove(classToggle)
	}
	public scrollToTop() {
		window.scrollTo(0,0);
	}
}
export const CommonUiEvents = new CommonUiEventsClass();
