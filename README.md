# NCCU_WorkStudyTime_kit

This is a kit for keying in the work-study time for those students who work in NCCU.
Please feel free to fork the repo or submit yout pull requests.

## 功能說明

此程式會自動填入本月工作日 8:00 ~ 12:00 的工作時數，直到填滿80小時。
程式運作邏輯為:
點選「新增工讀時數」→ 調整「工讀日期」→ 調整「工讀迄時」至 12:00

### 注意

1. 本程式不包含排除國定假日、颱風日、補假日，若有相關需求，請自行注意。
2. 若有調整總時數的需求，請依照「程式碼調整」更改。

## 如何使用？

-   1. 複製autocmp.js，
-   2. 到「校務資訊系統 → 學生資訊系統 → 財務服務 → 工讀時數登錄系統-學生版」
-   3. 進到要輸入時數的單號
-   4. 打開 Developer Tools (開啟快捷鍵如下)
       MacOS
       `Cmd + Option + i`
       Windows
       `Ctrl + Shift + i`
-   5. 將複製的內容貼上Console → 程式開始執行

## 錯誤排除

Ｑ: 程式找不到「新增工讀時數」按鈕。
Ａ: 右鍵點選「新增工讀時數」按鈕，點選 "Inspect"，再重新執行一次程式。

## 程式碼調整

1. 調整總時數: 調整程式碼第 13 行` while (date.getMonth() === month || workdays.length <= 20) {` 中
   `workdays.length <= 20` 的數字部分，假如總時數是 60 ，則這邊的數字要改成 `總時數 / 4` ，即15。
   注意因為每日工讀時段是 8:00 - 12:00，所以總時數若不是4的倍數的話最後需要自行手動修改。
