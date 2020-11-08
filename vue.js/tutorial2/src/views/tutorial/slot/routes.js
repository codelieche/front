var routes = [
    {
        path: "",
        name: "SlotHome",
        component: () => import("./home.vue")
    },
    // {
    //     path: "001",
    //     name: "Slot001Page",
    //     component: () => import("./001.vue")
    // },
    // {
    //     path: "002",
    //     name: "Slot002Page",
    //     component: () => import("./002.vue")
    // }
]

var subComponents = ['001', '002', '003']

subComponents.forEach(item => {
    routes.push({
        path: item,
        component: () => import(`./${item}.vue`)
    })
})

export default routes