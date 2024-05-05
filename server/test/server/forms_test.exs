defmodule Server.FormsTest do
  use Server.DataCase

  alias Server.Forms

  describe "scba_forms" do
    alias Server.Forms.SCBAForm

    import Server.FormsFixtures

    @invalid_attrs %{complete: nil, name: nil, date: nil, clean: nil, unit_number: nil, lights_working: nil, bottle_full: nil, straps_extended: nil, damage: nil}

    test "list_scba_forms/0 returns all scba_forms" do
      scba_form = scba_form_fixture()
      assert Forms.list_scba_forms() == [scba_form]
    end

    test "get_scba_form!/1 returns the scba_form with given id" do
      scba_form = scba_form_fixture()
      assert Forms.get_scba_form!(scba_form.id) == scba_form
    end

    test "create_scba_form/1 with valid data creates a scba_form" do
      valid_attrs = %{complete: true, name: "some name", date: ~N[2024-05-04 19:47:00], clean: true, unit_number: 42, lights_working: true, bottle_full: true, straps_extended: true, damage: true}

      assert {:ok, %SCBAForm{} = scba_form} = Forms.create_scba_form(valid_attrs)
      assert scba_form.complete == true
      assert scba_form.name == "some name"
      assert scba_form.date == ~N[2024-05-04 19:47:00]
      assert scba_form.clean == true
      assert scba_form.unit_number == 42
      assert scba_form.lights_working == true
      assert scba_form.bottle_full == true
      assert scba_form.straps_extended == true
      assert scba_form.damage == true
    end

    test "create_scba_form/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Forms.create_scba_form(@invalid_attrs)
    end

    test "update_scba_form/2 with valid data updates the scba_form" do
      scba_form = scba_form_fixture()
      update_attrs = %{complete: false, name: "some updated name", date: ~N[2024-05-05 19:47:00], clean: false, unit_number: 43, lights_working: false, bottle_full: false, straps_extended: false, damage: false}

      assert {:ok, %SCBAForm{} = scba_form} = Forms.update_scba_form(scba_form, update_attrs)
      assert scba_form.complete == false
      assert scba_form.name == "some updated name"
      assert scba_form.date == ~N[2024-05-05 19:47:00]
      assert scba_form.clean == false
      assert scba_form.unit_number == 43
      assert scba_form.lights_working == false
      assert scba_form.bottle_full == false
      assert scba_form.straps_extended == false
      assert scba_form.damage == false
    end

    test "update_scba_form/2 with invalid data returns error changeset" do
      scba_form = scba_form_fixture()
      assert {:error, %Ecto.Changeset{}} = Forms.update_scba_form(scba_form, @invalid_attrs)
      assert scba_form == Forms.get_scba_form!(scba_form.id)
    end

    test "delete_scba_form/1 deletes the scba_form" do
      scba_form = scba_form_fixture()
      assert {:ok, %SCBAForm{}} = Forms.delete_scba_form(scba_form)
      assert_raise Ecto.NoResultsError, fn -> Forms.get_scba_form!(scba_form.id) end
    end

    test "change_scba_form/1 returns a scba_form changeset" do
      scba_form = scba_form_fixture()
      assert %Ecto.Changeset{} = Forms.change_scba_form(scba_form)
    end
  end
end
