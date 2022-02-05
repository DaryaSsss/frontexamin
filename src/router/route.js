import { createRouter, createWebHashHistory } from "vue-router";
import PostPageWithStorage from "@/pages/PostPageWithStorage";
import DromMain from "../pages/Exam/DromMain";
import DromAbout from "../pages/Exam/DromAbout";

const routes = [
  {
    path: "/",
    component: DromMain,
  },
  {
    path: "/about",
    component: DromAbout,
  },
  {
    path: "/store",
    component: PostPageWithStorage,
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(process.env.BASE_URL),
});

export default router;
