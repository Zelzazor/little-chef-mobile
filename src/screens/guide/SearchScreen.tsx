import { Image, ScrollView, Text } from 'react-native';
import TagsFilter from './assets/10.jpg';
import ResultsPage from './assets/11.jpg';
import SearchByIngredients from './assets/7.jpg';
import SearchSelectionOfIngredients from './assets/8.jpg';
import SearchListSelectedIngredients from './assets/9.jpg';
import styles from './guide-styles';

export const GuideSearchScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titleText}>Search</Text>
      <Text style={styles.text}>
        The search module allows you to search for recipes by ingredients or by
        recipes.
      </Text>
      <Text style={styles.text}>
        To search by ingredients, click on the "Search by Ingredients" button
        and select the ingredients you want to search for. You can select as
        many ingredients as you want.
      </Text>
      <Image
        source={SearchByIngredients}
        style={styles.image}
        resizeMode="stretch"
      />
      <Text style={styles.text}>
        As soon as you select one ingredient, you will see the item dissapear
        from the list and appear in the "Selected Ingredients" list. You can
        access the "Selected Ingredients" list by pressing on the Shopping Cart
        icon on the top right corner.
      </Text>
      <Image
        source={SearchSelectionOfIngredients}
        style={styles.image}
        resizeMode="stretch"
      />
      <Text style={styles.text}>
        You can see the ingredients you have selected and you can also remove
        them from the list by pressing on the trash icon on the right side of
        the ingredient.
      </Text>
      <Image
        source={SearchListSelectedIngredients}
        style={styles.image}
        resizeMode="stretch"
      />
      <Text style={styles.text}>
        Once you have selected all the ingredients you want to search for, you
        can press on the "Let's cook" button and you will be redirected to the
        search results page.
      </Text>
      <Image source={ResultsPage} style={styles.image} resizeMode="stretch" />
      <Text style={styles.text}>
        This is the same screen you will see if you search for recipes by name.
        You can see the recipes that match your search criteria here.
      </Text>
      <Text style={styles.text}>
        Finally, you can choose whichever tag you want to filter the recipes by
        pressing on the icon on the top right corner.
      </Text>
      <Image source={TagsFilter} style={styles.image} resizeMode="stretch" />
    </ScrollView>
  );
};
