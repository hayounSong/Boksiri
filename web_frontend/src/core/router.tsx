import { BrowserRouter, Route, Routes } from "react-router-dom";
import SeniorMypage from "../pages/SeniorMypage";
import SeniorSchedule from "../components/seniorSchedule/seniorSchedule";
import SeniorMain from "../components/SeniorMain";
import SeniorSummaryPage from "../pages/SeniorSummaryPage";

import SeniorPillMain from "../components/seniorPill/SeniorPillMain";
import SeniorPillDetail from "../components/seniorPill/SeniorPillDetail";
import SeniorPillBill from "../components/seniorPill/SeniorPillBill";
import LoginPage from "../pages/LoginPage";
import KakaoAuthPage from "../pages/KakaoAuthPage";
import SeniorJoinPage from "../pages/SeniorJoinPage";
import GuardianJoinPage from "../pages/GuardianJoinPage";
import SeniorPillSelf from "../components/seniorPill/SeniorPillSelf";

import SeniorMealCheckPage from "../pages/SeniorMealCheckPage";
import SeniorExercise from "../pages/SeniorExerciseAddPage";
import SeniorExerciseMainPage from "../pages/SeniorExericseMainPage";
import SeniorMealMain from "../pages/SeniorMealMain";
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/kakao" element={<KakaoAuthPage />} />
        <Route path="/join/guardian" element={<GuardianJoinPage />} />
        <Route path="/join/senior" element={<SeniorJoinPage />} />
        <Route path="/senior/main" element={<SeniorMain />} />
        <Route path="/senior/myPage" element={<SeniorMypage />} />
        <Route path="/senior/pill" element={<SeniorPillMain />} />
        <Route path="/senior/pill/detail/:id" element={<SeniorPillDetail />} />
        <Route path="/senior/pill/bill" element={<SeniorPillBill />} />
        <Route path="/senior/pill/self" element={<SeniorPillSelf />} />
        <Route path="/senior/schedule" element={<SeniorSchedule />} />
        <Route path="/senior/summary" element={<SeniorSummaryPage />} />
        <Route path="/senior/meal/add" element={<SeniorMealCheckPage />} />
        <Route path="/senior/exercise" element={<SeniorExerciseMainPage />} />
        <Route path="/senior/exercise/add" element={<SeniorExercise />} />
        <Route path="/senior/meal" element={<SeniorMealMain />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
