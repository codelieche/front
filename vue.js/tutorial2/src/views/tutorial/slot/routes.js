var routes = [
    {
        path: "",
        name: "SlotHome",
        component: () => import("./home.vue")
    },
    {
        path: "001",
        name: "Slot001Page",
        component: () => import("./001.vue")
    }
]

export default routes