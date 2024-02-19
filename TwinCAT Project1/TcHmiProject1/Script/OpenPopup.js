// Keep these lines for a best effort IntelliSense of Visual Studio 2017 and higher.
/// <reference path="./../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.752.0/runtimes/native1.12-tchmi/TcHmi.d.ts" />
(function (/** @type {globalThis.TcHmi} */ TcHmi) {
    var Functions;
    (function (/** @type {globalThis.TcHmi.Functions} */ Functions) {
        var TcHmiProject1;
        (function (TcHmiProject1)
        {
            function OpenPopup(OpeningPopup, WhereToInsert, Name, PP, Request, Status) {
                var popupParametersControl = [];
                var PopupUuid = String("Popup");
                var popup;
                var popupType = "usercontrol";

                console.log("Control found 2");

                popupParametersControl['data-tchmi-left'] = 0;
                popupParametersControl['data-tchmi-top'] = 0;
                popupParametersControl['data-tchmi-height'] = 200;
                popupParametersControl['data-tchmi-width'] = 370;
                popupParametersControl['data-tchmi-palletstopname'] = Name;
                popupParametersControl['data-tchmi-palletstoprequest'] = Request;
                popupParametersControl['data-tchmi-palletstoppp'] = PP;
                popupParametersControl['data-tchmi-palletstopstatus'] = Status;

                WhereToInsert = "Desktop"

                popupParametersControl['data-tchmi-target-user-control'] = OpeningPopup;
                popup = TcHmi.ControlFactory.createEx('tchmi-user-control-host', PopupUuid, popupParametersControl);

                console.log(popup);

                var desktop = TcHmi.Controls.get(WhereToInsert);

                console.log(desktop);

                desktop.addChild(popup);
                TcHmiEx.Utilities.dragElement(document.getElementById(PopupUuid));

                console.log("Control found 4");
            }
            TcHmiProject1.OpenPopup = OpenPopup;

            console.log("Control found 5");

        })
        (TcHmiProject1 = Functions.TcHmiProject1 || (Functions.TcHmiProject1 = {}));
        Functions.registerFunctionEx('OpenPopup', 'TcHmi.Functions.TcHmiProject1', TcHmiProject1.OpenPopup);
    })
    (Functions = TcHmi.Functions || (TcHmi.Functions = {}));
})(TcHmi);
