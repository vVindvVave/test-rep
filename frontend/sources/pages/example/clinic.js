export default () => {
	document.querySelectorAll(".clinic__competencies-list-wrapper").forEach(el => {
		let wrapper = el,
			items = el.querySelector(".clinic__competencies-list-items"),
			shadowTop = el.querySelector('.shadow--top'),
			shadowBottom = el.querySelector('.shadow--bottom'),
			contentScrollHeight = items.scrollHeight - items.offsetHeight;

		if (items.scrollHeight > items.offsetHeight){
			shadowBottom.style.opacity = "1"
		}

		items.addEventListener('scroll', function (){
			var currentScroll = this.scrollTop / (contentScrollHeight);
			shadowTop.style.opacity = currentScroll;
			shadowBottom.style.opacity = 1 - currentScroll;
		})
	})

}