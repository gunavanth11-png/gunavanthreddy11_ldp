//Generics, Arrays and Containers
//Create a generic, singly linked list class called SList, which, to keep things simple, does not implement the List interface.
//Each Link object in the list should contain a reference to the next element in the list,
// but not the previous one (LinkedList, in contrast, is a doubly linked list, which means it maintains links in both directions).
//Create your own SListIterator which, again for simplicity, does not implement ListIterator. The only method in SList other than toString( ) should be iterator( ), which produces an SListIterator.
//The only way to insert and remove elements from an SList is through SListIterator. Write code to demonstrate SList.

package com.corejava.assignment9;

public class SList<T> {

    class Link {
        T data;
        Link next;

        Link(T data) {
            this.data = data;
        }
    }

    Link head;

    class SListIterator {
        void add(T data) {
            Link newLink = new Link(data);
            newLink.next = head;
            head = newLink;
        }

        void remove() {
            if (head != null)
                head = head.next;
        }
    }

    SListIterator iterator() {
        return new SListIterator();
    }

    public String toString() {
        String result = "";

        for (Link link = head; link != null; link = link.next)
            result += link.data + " ";

        return result;
    }

    public static void main(String[] args) {

        SList<String> list = new SList<>();
        SList<String>.SListIterator it = list.iterator();

        it.add("Java");
        it.add("Python");
        it.add("C++");

        System.out.println("List: " + list);

        it.remove();

        System.out.println("After remove: " + list);
    }
}