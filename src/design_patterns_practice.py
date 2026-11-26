"""Small examples of the Factory, Strategy, and Observer patterns."""

from collections.abc import Callable
from typing import Protocol


class Notification(Protocol):
    def send(self, message: str) -> str: ...


class EmailNotification:
    def send(self, message: str) -> str:
        return f"Email: {message}"


class SmsNotification:
    def send(self, message: str) -> str:
        return f"SMS: {message}"


class NotificationFactory:
    @staticmethod
    def create(channel: str) -> Notification:
        notification_types: dict[str, type[Notification]] = {
            "email": EmailNotification,
            "sms": SmsNotification,
        }
        try:
            notification_type = notification_types[channel.lower()]
        except KeyError as error:
            raise ValueError(f"Unsupported notification channel: {channel}") from error
        return notification_type()


class DiscountStrategy(Protocol):
    def apply(self, amount: float) -> float: ...


class NoDiscount:
    def apply(self, amount: float) -> float:
        return amount


class PercentageDiscount:
    def __init__(self, percentage: float) -> None:
        if not 0 <= percentage <= 100:
            raise ValueError("percentage must be between 0 and 100")
        self.percentage = percentage

    def apply(self, amount: float) -> float:
        return amount * (1 - self.percentage / 100)


class ShoppingCart:
    def __init__(self, discount: DiscountStrategy) -> None:
        self.discount = discount

    def checkout(self, subtotal: float) -> float:
        return self.discount.apply(subtotal)


class EventBus:
    def __init__(self) -> None:
        self._subscribers: dict[str, list[Callable[[str], None]]] = {}

    def subscribe(self, event_name: str, callback: Callable[[str], None]) -> None:
        self._subscribers.setdefault(event_name, []).append(callback)

    def publish(self, event_name: str, message: str) -> None:
        for callback in self._subscribers.get(event_name, []):
            callback(message)


def main() -> None:
    notification = NotificationFactory.create("email")
    print(notification.send("Your order has shipped."))

    cart = ShoppingCart(PercentageDiscount(10))
    print(f"Total after discount: ${cart.checkout(50):.2f}")

    events = EventBus()
    events.subscribe("order_placed", lambda order_id: print(f"Received order {order_id}"))
    events.publish("order_placed", "ORD-1001")


if __name__ == "__main__":
    main()
