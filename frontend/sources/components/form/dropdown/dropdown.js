export default {
    props: ['items', 'all', 'name'],
    data(){
        return {
            isOpen: false,
            activeItems: []
        }
    },
    computed: {
        headText(){

            if (this.$el) {
                const formItem = this.$el.closest('.form-item');
                if (!this.activeItems.length) {
                    formItem.classList.remove('_not-empty');
                } else {
                    formItem.classList.add('_not-empty');
                }
            }

            let isAll = false;
            this.activeItems.map((mapItem, mapIndex) => {
                if (mapItem === this.all) isAll = true;
            });

            if (isAll) {
                return this.all;
            } else {
                return this.activeItems.join('; ');
            }

        }
    },
    methods: {
        onItemClick(item){

            if (!this.activeItems.includes(item)) {

                this.activeItems.push(item);

            } else {

                let index = 0;
                this.activeItems.map((mapItem, mapIndex) => {
                    if (mapItem === item) index = mapIndex;
                });
                this.activeItems.splice(index, 1);

                let allIndex = false;
                this.activeItems.map((mapItem, mapIndex) => {
                    if (mapItem === this.all) allIndex = mapIndex;
                });
                if (allIndex !== false) this.activeItems.splice(allIndex, 1);

            }

        },
        onItemClickAll(){

            if (!this.activeItems.includes(this.all)) {

                this.activeItems.push(this.all);

                this.items.map((mapItem, mapIndex) => {
                    if (!this.activeItems.includes(mapItem)) {
                        this.activeItems.push(mapItem);
                    }
                });

            } else {

                this.activeItems = [];

            }

        }
    },
    mounted(){

        document.addEventListener('click', (e) => {
            if (!e.composedPath().includes(this.$el)) {
                this.isOpen = false;
            }
        });

    }
}