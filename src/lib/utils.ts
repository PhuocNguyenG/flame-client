import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get string lang by string path name
 * @param url Path name
 */
export const getLangByPathname = (pathname: string) => {
  if (pathname.startsWith("/en/") || pathname === "/en") {
    return "en";
  }
  return "vi";
};

export const getPositionElement = (element: HTMLDivElement) => {
  var xPosition = 0,
    yPosition = 0;

  while (element) {
    xPosition += element.offsetLeft + element.clientLeft;
    yPosition += element.offsetTop + element.clientTop;
    element = element.offsetParent as HTMLDivElement;
  }
  return {
    x: xPosition,
    y: yPosition,
  };
};


/**
 * Remove accent Vietnamese
 * @param string Vietnamese string
 * @returns Vietnamese without accent
 */
export const removeAccentVietNamese = (string: string) => {
  var from =
      "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ",
    to =
      "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";
  for (var i = 0, l = from.length; i < l; i++) {
    string = string.toLowerCase().replace(RegExp(from[i], "gi"), to[i]);
  }
  return string;
};

/**
 * Add accent for regex search
 * @param string Vietnamese string
 * @returns Vietnamese with accent
 */
export const addAccentVietNamese = (string: string) => {
  var from = ["a", "c", "d", "e", "u", "o", "i", "n", "y"],
    to = [
      "[a,à,á,ã,ả,ạ,ă,ằ,ắ,ẳ,ẵ,ặ,â,ầ,ấ,ẩ,ẫ,ậ,ä]",
      "[c,ç]",
      "[d,đ]",
      "[e,è,é,ẻ,ẽ,ẹ,ê,ề,ế,ể,ễ,ệ,ë]",
      "[u,ù,ú,ủ,ũ,ụ,ư,ừ,ứ,ử,ữ,ự,ü,û]",
      "[o,ò,ó,ỏ,õ,ọ,ô,ồ,ố,ổ,ỗ,ộ,ơ,ờ,ớ,ở,ỡ,ợ,ö]",
      "[i,ì,í,ỉ,ĩ,ị,ï,î]",
      "[n,ñ]",
      "[y,ý,ỳ,ỹ,ỵ,ỷ]",
    ];
  var accentCheck = [
    "aàáãảạăằắẳẵặâầấẩẫậ",
    "cç",
    "dđ",
    "eèéẻẽẹêềếểễệ",
    "uùúủũụưừứửữự",
    "oòóỏõọôồốổỗộơờớởỡợ",
    "iìíỉĩị",
    "nñ",
    "yýỳỹỵỷ",
  ];
  for (var i = 0, l = from.length; i < l; i++) {
    for (var y = 0, z = accentCheck[i].length; y < z; y++) {
      if (string.indexOf(accentCheck[i][y]) > -1) {
        string = string
          .toLowerCase()
          .replace(RegExp(accentCheck[i][y], "gi"), to[i]);
        break;
      }
    }
  }
  return string;
};
