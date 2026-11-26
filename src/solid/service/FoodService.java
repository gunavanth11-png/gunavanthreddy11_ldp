package solid.service;

import solid.model.Food;

public class FoodService {

    public void prepareFood(Food food) {
        food.prepare();
    }
}