import { getCategories } from './axios';

export const categoriesKeyboard = async (): Promise<any> => {
  const arrayOfCategories = await getCategories();

  return arrayOfCategories.map((item: any) => {
    return [
      {text: `${item}`, callback_data: `${item}`}
    ];
  });
};

