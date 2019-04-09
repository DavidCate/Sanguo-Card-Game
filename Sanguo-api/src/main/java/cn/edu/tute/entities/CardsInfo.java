package cn.edu.tute.entities;

import java.io.Serializable;
import java.util.List;

public class CardsInfo implements Serializable {
    private List<Card> cards;

    public List<Card> getCards() {
        return cards;
    }

    public void setCards(List<Card> cards) {
        this.cards = cards;
    }
}
